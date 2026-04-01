import { useState, useRef, useEffect } from 'react';

export const useTextToSpeech = () => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

    useEffect(() => {
        return () => {
            window.speechSynthesis.cancel();
        };
    }, []);

    const speak = (text: string, lang = 'en-IN') => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel(); // Stop any current speech

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = lang;
            utterance.rate = 1.0;

            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            utterance.onerror = () => setIsSpeaking(false);

            utteranceRef.current = utterance;
            window.speechSynthesis.speak(utterance);
        }
    };

    const stop = () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    };

    return { isSpeaking, speak, stop };
};
