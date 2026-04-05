import axios from "axios";

const GROQ_API_KEY = import.meta.env.VITE_GROQ_CHATBOT_API_KEY;

/**
 * Simplifies complex scheme text into simple Hindi/English for farmers using the backend AI service.
 * Always falls back to original text if AI fails to prevent technical errors showing.
 */
export const simplifyTextForFarmer = async (text: string, language: string = "Hindi"): Promise<string> => {
    try {
        const response = await axios.post("http://localhost:5000/simplify-text", {
            text,
            language
        });

        return response.data.simplified_text || text;

    } catch (error: any) {
        console.error("Simplification error, falling back to original:", error);
        // Important: Return original text instead of error to maintain UX
        return text;
    }
};

/**
 * Stops any ongoing speech.
 */
export const stopSpeech = () => {
    if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
    }
};

/**
 * Speaks the text using Web Speech API with smart voice fallback.
 * If the requested language voice is not available, falls back to next best.
 */
export const speakText = (text: string, lang: string = "hi-IN") => {
    if (!window.speechSynthesis) {
        alert("Voice not supported on this browser.");
        return;
    }

    // Stop previous speech
    stopSpeech();

    const langFallbackMap: Record<string, string[]> = {
        'as-IN': ['as-IN', 'bn-IN', 'hi-IN', 'en-IN', 'en-US'],
        'kn-IN': ['kn-IN', 'te-IN', 'hi-IN', 'en-IN', 'en-US'],
        'bn-IN': ['bn-IN', 'hi-IN', 'en-IN', 'en-US'],
        'hi-IN': ['hi-IN', 'en-IN', 'en-US'],
        'en-IN': ['en-IN', 'en-US'],
        'mr-IN': ['mr-IN', 'hi-IN', 'en-IN', 'en-US'],
        'ta-IN': ['ta-IN', 'te-IN', 'en-IN', 'en-US'],
        'te-IN': ['te-IN', 'ta-IN', 'en-IN', 'en-US'],
    };

    const doSpeak = () => {
        const voices = window.speechSynthesis.getVoices();
        const fallbacks = langFallbackMap[lang] || [lang, 'hi-IN', 'en-IN', 'en-US'];

        let selectedVoice: SpeechSynthesisVoice | null = null;
        let chosenLang = lang;

        for (const fallbackLang of fallbacks) {
            const voice = voices.find(
                v => v.lang === fallbackLang || v.lang.startsWith(fallbackLang.split('-')[0])
            );
            if (voice) {
                selectedVoice = voice;
                chosenLang = fallbackLang;
                break;
            }
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = chosenLang;
        if (selectedVoice) utterance.voice = selectedVoice;
        utterance.rate = 0.9;
        utterance.pitch = 1;

        window.speechSynthesis.speak(utterance);
    };

    // Voices may not be loaded yet on first call (browser async)
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
        doSpeak();
    } else {
        window.speechSynthesis.onvoiceschanged = () => {
            window.speechSynthesis.onvoiceschanged = null;
            doSpeak();
        };
    }
};
