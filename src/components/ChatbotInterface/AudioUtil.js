// Function to check if the input is a stop command
export function isStopCommand(input) {
    const stopPattern = /\b(stop|hold on|wait|one minute|a minute|shut up|quit|enough|be quiet|silence)\b/i;

    // Check if the input is a short sentence (roughly 5 words or less)
    const words = input.trim().split(/\s+/);
    const isShortSentence = words.length <= 5;

    // Remove punctuation for the stop word check
    const cleanedInput = input.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");

    return stopPattern.test(cleanedInput) && isShortSentence;
}

// Function to check if the input is a skip command
export function isSkipCommand(input) {
    // Check if the input is a short sentence (roughly 5 words or less)
    const words = input.trim().split(/\s+/);
    return words.length > 5;
}

export function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 15);
}

let lastText = ""; // Stores the last processed text
// Function to check if the text has changed
export function isTextChanged(newText, isReset = false) {
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

export async function getAudioBlob(ai_message) {
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

    return audioUrl;
}
