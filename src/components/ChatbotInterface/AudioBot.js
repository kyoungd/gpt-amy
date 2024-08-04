import { createClient, LiveTranscriptionEvents } from '@deepgram/sdk';
import { analyzeProsody, endsWithFiller } from './ProsodicFeature';
import { setupAudio, closeAudio } from './SetupAudioMedia';
import { isStopCommand, isSkipCommand, generateUniqueId, isTextChanged, getAudioBlob } from './AudioUtil';

// Variables for managing async calls and audio setup
let asyncCallToAIId; // Unique identifier for async AI calls
let asyncCallToAIFunc; // Function to make async AI calls
let deepgramChannel; // Deepgram websocket channel
let outputAudioContext; // Audio context for processing output audio
let handleTextSubmitFunc; // Function to handle text submission
let isAudioMediaEnabled = false; // Flag to indicate if audio is enabled
let setAudioButtonOffFunc; // Function to toggle audio button off

// Function to stop audio capture and processing
export function stopAudio() {
    isAudioMediaEnabled = false;
    closeAudio();
    closeDeepgram();
}

function closeDeepgram() {    
    if (deepgramChannel) {
        deepgramChannel.send(JSON.stringify({ type: 'CloseStream' }));
        deepgramChannel = null;
    }
    console.log("Audio stopped");
}

// Function to set up Deepgram for speech recognition
async function setupDeepgram(callAfterAudioSetupFunc) {
    try {
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
                
                if (isTextChanged(transcript, false)) {
                    asyncCallToAIId = generateUniqueId();
                    if (isAudioPlaying)
                        killAudio();
                }
                if (speech_final) {
                    if (transcript?.trim().length > 0) {
                        console.log("speech_final: client_message:", client_message);
                        if (currentAudio && isStopCommand(client_message))
                            killAudio();
                        else if (currentAudio && isSkipCommand(transcript.trim())) {
                            killAudio();
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
                if (client_message?.trim().length > 0) {
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
        
        const audioUrl = await getAudioBlob(ai_message);

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
let isAudioPlaying = false;

// Function to play audio from a URL
function playAudio(audioUrl) {
    isAudioPlaying = true;
    if (currentAudio) {
        killAudio();
    }
    currentAudio = new Audio(audioUrl);
    const source = outputAudioContext.createMediaElementSource(currentAudio);
    source.connect(outputAudioContext.destination);
    currentAudio.play();

    currentAudio.addEventListener('ended', function () {
        currentAudio = null;
        console.log('Audio playback finished');
        isAudioPlaying = false;
    });
}

// Function to stop audio playback
function killAudio() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }
}

// Main function to start audio capture and processing
export async function startAudio(handleSubmit, callAfterAudioSetupFunc, audioSetupFailedFunc, toggleAudioButtonFunc, asyncCall2AI) {
    try {
        isAudioMediaEnabled = true;
        handleTextSubmitFunc = handleSubmit;
        asyncCallToAIFunc = asyncCall2AI;
        setAudioButtonOffFunc = toggleAudioButtonFunc;
        await setupDeepgram(callAfterAudioSetupFunc);
        outputAudioContext = await setupAudio(deepgramChannel);
        // greet the user.
        const audioUrl = await getAudioBlob("Hi. Amy here. Welcome to voice chat.");
        playAudio(audioUrl);
    }
    catch (error) {
        console.error("Error starting audio:", error);
        audioSetupFailedFunc();
    }
}

// OVERVIEW OF THE AUDIOBOT.JS
// This program handles audio with AI integration using Deepgram for real-time Speech-to-Text (STT).
// Speech data is sent as text to the AI, which responds in text. This text is then converted to audio and played.
// This approach is necessary because user permission to access audio media cannot be automated. 
// Therefore, all audio-related work must be done on the client side, where the user can give explicit permission.
// The program uses prosodic analysis and filler word analysis to differentiate between conversation pauses and turns.
// If a conversation pause is misinterpreted as a turn due to LiveTranscriptionEvents.UtteranceEnd firing prematurely
// and the user continues speaking before the AI responds, a new AI response request is issued, ignoring previous ones.
// If the user starts speaking while the AI is talking, the AI stops talking and listens to the user.
