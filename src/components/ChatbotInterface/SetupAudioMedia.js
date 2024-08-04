let mediaStream; // Stream from user's audio input device
let inputAudioContext; // Audio context for processing input audio
let outputAudioContext; // Audio context for processing output audio
let workletNode; // Audio worklet node for processing audio

// Function to set up audio capture and processing
export async function setupAudio(deepgramChannel) {
    // Check browser support
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("audio device is not accessible.");
        throw new Error("audio device are not accessible. getUserMedia is not supported in this browser");
    }

    try {
        // Request audio with specific constraints
        mediaStream = await navigator.mediaDevices.getUserMedia({
            audio: {
                echoCancellation: true,
                noiseSuppression: true,
                autoGainControl: true
            }
        });

        inputAudioContext = new (window.AudioContext || window.webkitAudioContext)();
        outputAudioContext = new (window.AudioContext || window.webkitAudioContext)();

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
            await inputAudioContext.audioWorklet.addModule(workletUrl);

            // Clean up the Blob URL
            URL.revokeObjectURL(workletUrl);

        } catch (moduleError) {
            console.error("Error loading audio worklet module:", moduleError);
            throw new Error("Failed to load audio processor. Please try again.");
        }

        const source = inputAudioContext.createMediaStreamSource(mediaStream);

        workletNode = new AudioWorkletNode(inputAudioContext, 'audio-processor');
        source.connect(workletNode);
        workletNode.connect(inputAudioContext.destination);

        workletNode.port.onmessage = (event) => {
            if (event.data.type === 'audio') {
                if (deepgramChannel) {
                    deepgramChannel.send(event.data.buffer);
                }
            }
        };

        console.log("Audio setup completed");

        // Return important objects if needed elsewhere
        return { mediaStream, inputAudioContext, outputAudioContext, workletNode };

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
export function closeAudio() {
    if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
    }
    if (inputAudioContext) {
        inputAudioContext.close();
    }
    if (outputAudioContext) {
        outputAudioContext.close();
    }
    if (workletNode) {
        workletNode.disconnect();
    }
    console.log("Audio stopped");
}

export function outAudioContext() {
    return outputAudioContext;
}
