import axios from 'axios';

class TextTranslator {
    constructor() {
        this._fromLang = 'auto';
        this._toLang = 'en';      // Default target language
    }

    /**
     * Set the source language (default is 'auto')
     * @param {string} lang - Language code (e.g., 'en', 'fr', 'es')
     */
    set fromLang(lang) {
        this._fromLang = lang;
    }

    /**
     * Set the target language (default is 'en')
     * @param {string} lang - Language code (e.g., 'en', 'fr', 'es')
     */
    set toLang(lang) {
        this._toLang = lang;
    }

    /**
     * Translates the given text using Google's Translation API
     * @param {string} message - The text to translate
     * @returns {Promise<string>} - The translated text
     */
    async translate(message) {
        if (!message) {
            throw new Error("Translation text cannot be empty.");
        }

        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${this._fromLang}&tl=${this._toLang}&dt=t&q=${encodeURIComponent(message)}`;

        try {
            const response = await axios.get(url);
            const translatedText = response.data[0][0][0]; // Extract translated text
            console.log("Translated text:", translatedText);
            return translatedText;
        } catch (error) {
            console.error("Error while translating:", error);
            return null;
        }
    }
}

export default TextTranslator;
