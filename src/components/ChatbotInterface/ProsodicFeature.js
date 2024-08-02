// Add these functions at the beginning of your file or in a separate module
export function analyzeProsody(audioBuffer, sampleRate) {
    const frameSize = Math.floor(sampleRate * 0.03); // 30ms frame
    const frames = [];
    
    // Split audio into frames
    for (let i = 0; i < audioBuffer.length; i += frameSize) {
        frames.push(audioBuffer.slice(i, i + frameSize));
    }

    // Calculate energy for each frame
    const energies = frames.map(frame => 
        frame.reduce((sum, sample) => sum + sample * sample, 0) / frame.length
    );

    // Detect falling intonation
    const fallingIntonation = detectFallingIntonation(energies);

    // Detect decreased speaking rate
    const decreasedRate = detectDecreasedRate(energies);

    return fallingIntonation || decreasedRate;
}

function detectFallingIntonation(energies) {
    const threshold = 0.7; // Adjust as needed
    const lastFewFrames = energies.slice(-5);
    return lastFewFrames.every((energy, index) => 
        index === 0 || energy < lastFewFrames[index - 1] * threshold
    );
}

function detectDecreasedRate(energies) {
    const threshold = 0.5; // Adjust as needed
    const averageEnergy = energies.reduce((sum, energy) => sum + energy, 0) / energies.length;
    const lastFewFrames = energies.slice(-5);
    return lastFewFrames.every(energy => energy < averageEnergy * threshold);
}

const fillerWords = ["um", "uh", "you know", "like", "so", "well", "hmm"];

export function endsWithFiller(text) {
    const words = text.trim().split(/\s+/); // Split text into words
    const lastWord = words[words.length - 1].toLowerCase(); // Get the last word in lowercase

    return fillerWords.includes(lastWord);
}
