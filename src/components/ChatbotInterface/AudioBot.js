import { createClient, LiveTranscriptionEvents } from '@deepgram/sdk';
import { analyzeProsody, endsWithFiller } from './ProsodicFeature';

let connection;
let mediaStream;
let audioContext;
let workletNode;
let handleTextSubmit;

async function setupAudio() {
    // Check browser support
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("audio device is not accessible.");
        throw new Error("audio device are not accessible. getUserMedia is not supported in this browser");
    }

    try {
        // Request audio with specific constraints
        const mediaStream = await navigator.mediaDevices.getUserMedia({
            audio: {
                echoCancellation: true,
                noiseSuppression: true,
                autoGainControl: true
            }
        });

        const audioContext = new (window.AudioContext || window.webkitAudioContext)();

        try {
            // Define AudioProcessor directly in the code
            const audioProcessorCode = `
                class AudioProcessor extends AudioWorkletProcessor {
                    process(inputs, outputs, parameters) {
                        const input = inputs[0];
                        const channel = input[0];
                        
                        if (channel && channel.length > 0) {
                            // Convert Float32Array to Int16Array
                            const int16Data = new Int16Array(channel.length);
                            for (let i = 0; i < channel.length; i++) {
                                int16Data[i] = Math.max(-32768, Math.min(32767, Math.floor(channel[i] * 32768)));
                            }
                            
                            this.port.postMessage({
                                type: 'audio',
                                buffer: int16Data.buffer
                            }, [int16Data.buffer]);
                        }
                        
                        return true;
                    }
                }

                registerProcessor('audio-processor', AudioProcessor);
            `;

            // Create a Blob containing the AudioProcessor code
            const blob = new Blob([audioProcessorCode], { type: 'application/javascript' });
            const workletUrl = URL.createObjectURL(blob);

            // Load the AudioWorklet module
            await audioContext.audioWorklet.addModule(workletUrl);

            // Clean up the Blob URL
            URL.revokeObjectURL(workletUrl);

        } catch (moduleError) {
            console.error("Error loading audio worklet module:", moduleError);
            throw new Error("Failed to load audio processor. Please try again.");
        }

        const source = audioContext.createMediaStreamSource(mediaStream);

        const workletNode = new AudioWorkletNode(audioContext, 'audio-processor');
        source.connect(workletNode);
        workletNode.connect(audioContext.destination);

        workletNode.port.onmessage = (event) => {
            if (event.data.type === 'audio') {
                if (connection) {
                    connection.send(event.data.buffer);
                }
            }
        };

        console.log("Audio setup completed");


        // Return important objects if needed elsewhere
        return { mediaStream, audioContext, workletNode };

    } catch (error) {
        console.error("Error setting up audio:", error.name, error.message);
        if (error.constraint) {
            console.error("Constraint that failed:", error.constraint);
        }
        
        // Provide more user-friendly error messages
        switch(error.name) {
            case 'NotAllowedError':
                alert("Microphone access was denied. Please allow microphone access and try again.");
                break;
            case 'NotFoundError':
                alert("No microphone was found. Please check your audio input devices and try again.");
                break;
            case 'NotReadableError':
                alert("There was an issue accessing your microphone. Please check your audio settings and try again.");
                break;
            default:
                alert("An error occurred while setting up audio. Please try again.");
        }

        throw error; // Re-throw the error for further handling if needed
    }
}

export function stopAudio() {
    if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
    }
    if (audioContext) {
        audioContext.close();
    }
    if (workletNode) {
        workletNode.disconnect();
    }
    if (connection) {
        connection.send(JSON.stringify({ type: 'CloseStream' }));
        connection = null;
    }
    console.log("Audio stopped");
}

async function setupDeepgram(callAfterAudioSetupFunc) {
    try {
        // const response = await fetch('/api/deepgram-key');
        // const data = await response.json();
        // const deepgramApiKey = data.key;

        const deepgramApiKey = process.env.REACT_APP_DEEPGRAM_API_KEY;
        const deepgram = createClient(deepgramApiKey);
        connection = deepgram.listen.live({
            model: "nova-2",
            smart_format: true,
            encoding: "linear16",
            sample_rate: 48000,
            channels: 1,
            interim_results: true,
            utterance_end_ms: 2000,
            vad_events: true,
        });

        let audioBuffer = [];

        connection.on(LiveTranscriptionEvents.Open, () => {
            console.log('Connected to Deepgram');
            callAfterAudioSetupFunc();

            let client_message = "";
            let last_transcript = "";

            connection.on(LiveTranscriptionEvents.Transcript, (transcription) => {
                const transcript = transcription.channel.alternatives[0].transcript;
                const speech_final = transcription.speech_final;

                // Collect audio data for prosody analysis
                if (transcription.audio) {
                    audioBuffer = audioBuffer.concat(Array.from(new Float32Array(transcription.audio)));
                }

                if (transcript && transcript.trim().length > 0 && transcript !== last_transcript) {
                    console.log("LiveTranscriptionEvents.Transcript: ", transcript);
                    last_transcript = transcript;
                    client_message = client_message + ' ' + transcript;
                }
                
                if (speech_final) {
                    if (transcript?.trim().length > 0) {
                        console.log("speech_final: client_message:", client_message);
                        if (currentAudio && isStopCommand(client_message))
                            killAudio(true);
                        if (currentAudio && isSkipCommand(transcript.trim())) {
                            killAudio(false);
                        }
                    }
                }
            });

            connection.on(LiveTranscriptionEvents.UtteranceEnd, async () => {
                console.log('end of speech detected.');
                if (isAudioKilled) {
                    isAudioKilled = false;
                } else if (client_message?.trim().length > 0) {
                    // Perform prosody analysis
                    const prosodyIndicatesEnd = analyzeProsody(audioBuffer, 48000); // Assuming 48kHz sample rate

                    if (prosodyIndicatesEnd && !endsWithFiller(client_message)) {
                        await getAndPlayAIResponse(client_message);
                        client_message = "";
                        audioBuffer = []; // Clear the audio buffer for the next utterance
                    } else {
                        console.log("Prosody does not indicate end of turn. Waiting for more input.");
                    }
                }

            });

            connection.on(LiveTranscriptionEvents.SpeechStarted, () => {
                console.log('start of speech detected.');
            });

            connection.on(LiveTranscriptionEvents.Error, (error) => {
                console.error('Deepgram Error:', error);
            });

            connection.on(LiveTranscriptionEvents.Close, () => {
                console.log('Disconnected from Deepgram');
            });
        });

    } catch (error) {
        console.error('Error setting up Deepgram:', error);
    }
}

async function getAndPlayAIResponse(transcript) {
    try {
        console.log('SUBMIT getAndPlayAIResponse: ', transcript);

        const ai_message = await handleTextSubmit(transcript);
        // First, get the AI response

        if (ai_message) {
            console.log('aiData.message: ', ai_message);
            // Use our new TTS API route
            const ttsResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/sound-files`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: ai_message }),
            });

            if (!ttsResponse.ok) {
                throw new Error(`HTTP error! status: ${ttsResponse.status}`);
            }

            const audioBlob = await ttsResponse.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            playAudio(audioUrl);

        }
    } catch (error) {
        console.error('Error getting or playing AI response:', error);
    }
}

let currentAudio = null;
let isAudioKilled = false;

function playAudio(audioUrl) {
    // Play the audio
    if (currentAudio) {
        killAudio(false);
    }
    currentAudio = new Audio(audioUrl);
    currentAudio.play();

    currentAudio.addEventListener('ended', function () {
        currentAudio = null;
        console.log('Audio playback finished');
        // You can add any code here to execute when the audio finishes
    });
}

function isStopCommand(input) {
    const stopPattern = /\b(stop|hold on|wait|one minute|a minute|shut up|quit|enough|be quiet|silence)\b/i;

    // Check if the input is a short sentence (roughly 5 words or less)
    const words = input.trim().split(/\s+/);
    const isShortSentence = words.length <= 5;

    // Remove punctuation for the stop word check
    const cleanedInput = input.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");

    return stopPattern.test(cleanedInput) && isShortSentence;
}

function isSkipCommand(input) {
    // Check if the input is a short sentence (roughly 5 words or less)
    const words = input.trim().split(/\s+/);
    return words.length > 5;
}

function killAudio(isAudioKillEnabled) {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
        isAudioKilled = isAudioKillEnabled;
    }
}

export async function startAudio(handleSubmit, callAfterAudioSetupFunc, audioSetupFailedFunc) {
    try {
        handleTextSubmit = handleSubmit;
        await setupAudio(AudioDestinationNode);
        await setupDeepgram(callAfterAudioSetupFunc);    
    }
    catch {
        audioSetupFailedFunc();
    }
}


