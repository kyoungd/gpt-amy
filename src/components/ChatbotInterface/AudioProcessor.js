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