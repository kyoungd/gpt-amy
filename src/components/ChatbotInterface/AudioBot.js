
import { createClient, LiveTranscriptionEvents } from '@deepgram/sdk';
import { analyzeProsody, endsWithFiller } from './ProsodicFeature';

// Variables for managing async calls and audio setup
let asyncCallToAIId; // Unique identifier for async AI calls
let asyncCallToAIFunc; // Function to make async AI calls
let deepgramChannel; // Deepgram websocket channel
let mediaStream; // Stream from user's audio input device
let audioContext; // Audio context for processing audio
let workletNode; // Audio worklet node for processing audio
let handleTextSubmitFunc; // Function to handle text submission
let isAudioMediaEnabled = false; // Flag to indicate if audio is enabled
let setAudioButtonOffFunc; // Function to toggle audio button off

// Function to set up audio capture and processing
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
                if (deepgramChannel) {
                    deepgramChannel.send(event.data.buffer);
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

// Function to stop audio capture and processing
export function stopAudio() {
    isAudioMediaEnabled = false;
    if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
    }
    if (audioContext) {
        audioContext.close();
    }
    if (workletNode) {
        workletNode.disconnect();
    }
    if (deepgramChannel) {
        deepgramChannel.send(JSON.stringify({ type: 'CloseStream' }));
        deepgramChannel = null;
    }
    console.log("Audio stopped");
}

function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 15);
}

let lastText = ""; // Stores the last processed text
// Function to check if the text has changed
function isTextChanged(newText, isReset = false) {
    if (isReset) {
        lastText = "";
        return false;
    }
    if (newText && newText.trim() && newText.trim() !== lastText) {
        lastText = newText.trim();
        return true;
    }
    return false;
}

// Function to set up Deepgram for speech recognition
async function setupDeepgram(callAfterAudioSetupFunc) {
    try {
        // const response = await fetch('/api/deepgram-key');
        // const data = await response.json();
        // const deepgramApiKey = data.key;

        const deepgramApiKey = process.env.REACT_APP_DEEPGRAM_API_KEY;
        const deepgram = createClient(deepgramApiKey);
        deepgramChannel = deepgram.listen.live({
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
        let client_message = "";

        deepgramChannel.on(LiveTranscriptionEvents.Open, () => {
            console.log('Connected to Deepgram');
            callAfterAudioSetupFunc();

            deepgramChannel.on(LiveTranscriptionEvents.Transcript, (transcription) => {
                const transcript = transcription.channel.alternatives[0].transcript;
                const speech_final = transcription.speech_final;

                // Collect audio data for prosody analysis
                if (transcription.audio) {
                    audioBuffer = audioBuffer.concat(Array.from(new Float32Array(transcription.audio)));
                }
                
                if (isTextChanged(transcript, false))
                    asyncCallToAIId = generateUniqueId();
                if (speech_final) {
                    if (transcript?.trim().length > 0) {
                        console.log("speech_final: client_message:", client_message);
                        if (currentAudio && isStopCommand(client_message))
                            killAudio(true);
                        else if (currentAudio && isSkipCommand(transcript.trim())) {
                            killAudio(false);
                        }
                        else {
                            console.log("LiveTranscriptionEvents.Transcript: ", transcript);
                            client_message = client_message + ' ' + transcript;
                        }
                    }
                }
            });

            deepgramChannel.on(LiveTranscriptionEvents.UtteranceEnd, async () => {
                console.log('end of speech detected.');
                if (isAudioKilled) {
                    isAudioKilled = false;
                } else if (client_message?.trim().length > 0) {
                    // Perform prosody analysis
                    const prosodyIndicatesEnd = analyzeProsody(audioBuffer, 48000); // Assuming 48kHz sample rate

                    if (prosodyIndicatesEnd && !endsWithFiller(client_message)) {
                        const callId = await submitTextToAI(client_message, asyncCallToAIId);
                        if (asyncCallToAIId === callId) {
                            client_message = "";
                            audioBuffer = []; // Clear the audio buffer for the next utterance
                            isTextChanged("", true);
                        }
                    } else {
                        console.log("Prosody does not indicate end of turn. Waiting for more input.");
                    }
                }

            });

            deepgramChannel.on(LiveTranscriptionEvents.SpeechStarted, () => {
                console.log('start of speech detected.');
            });

            deepgramChannel.on(LiveTranscriptionEvents.Error, (error) => {
                console.error('Deepgram Error:', error);
            });

            deepgramChannel.on(LiveTranscriptionEvents.Close, () => {
                console.log('Disconnected from Deepgram');
                if (isAudioMediaEnabled) {
                    isAudioMediaEnabled = false;
                    setAudioButtonOffFunc();
                }
            });
        });

    } catch (error) {
        console.error('Error setting up Deepgram:', error);
    }
}

// Function to submit transcribed text to AI and handle the response
async function submitTextToAI(transcript, callId) {
    try {
        console.log('SUBMIT getAndPlayAIResponse: ', transcript);

        const result = await asyncCallToAIFunc(transcript);
        if (callId !== asyncCallToAIId)
            return callId;

        // First, get the AI response
        const ai_message = result.message;
        if (!ai_message && ai_message.length === 0)
            return callId;
        
        console.log('aiData.message: ', ai_message);
        const url = process.env.REACT_APP_TTS_URL;
        // Use our new TTS API route
        const ttsResponse = await fetch(`${url}`, {
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

        if (callId !== asyncCallToAIId)
            return callId;
        playAudio(audioUrl);
        await handleTextSubmitFunc(transcript, result);
        return callId;
    } catch (error) {
        console.error('Error getting or playing AI response:', error);
        return callId;
    }
}

let currentAudio = null; // Stores the currently playing audio
let isAudioKilled = false; // Flag to indicate if audio playback was stopped

// Function to play audio from a URL
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

// Function to check if the input is a stop command
function isStopCommand(input) {
    const stopPattern = /\b(stop|hold on|wait|one minute|a minute|shut up|quit|enough|be quiet|silence)\b/i;

    // Check if the input is a short sentence (roughly 5 words or less)
    const words = input.trim().split(/\s+/);
    const isShortSentence = words.length <= 5;

    // Remove punctuation for the stop word check
    const cleanedInput = input.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");

    return stopPattern.test(cleanedInput) && isShortSentence;
}

// Function to check if the input is a skip command
function isSkipCommand(input) {
    // Check if the input is a short sentence (roughly 5 words or less)
    const words = input.trim().split(/\s+/);
    return words.length > 5;
}

// Function to stop audio playback
function killAudio(isAudioKillEnabled) {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
        isAudioKilled = isAudioKillEnabled;
    }
}

// Main function to start audio capture and processing
export async function startAudio(handleSubmit, callAfterAudioSetupFunc, audioSetupFailedFunc, toggleAudioButtonFunc, asyncCall2AI) {
    try {
        isAudioMediaEnabled = true;
        handleTextSubmitFunc = handleSubmit;
        asyncCallToAIFunc = asyncCall2AI;
        setAudioButtonOffFunc = toggleAudioButtonFunc;
        await setupAudio(AudioDestinationNode);
        await setupDeepgram(callAfterAudioSetupFunc);    
    }
    catch {
        audioSetupFailedFunc();
    }
}


