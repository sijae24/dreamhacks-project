import React, { useState, useEffect } from 'react';
import Peer from 'peerjs';
import TextTranslator from '../service/TextTranslator';

const Chatbot = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [language, setLanguage] = useState('es'); // Default language: Spanish

    // Create an instance of TextTranslator
    const translator = new TextTranslator();
    translator.toLang = language;

    useEffect(() => {
        // PeerJS setup can go here
    }, []);

    const handleSendClick = async () => {
        if (message.trim()) {
            try {
                const translatedText = await translator.translate(message);
                setMessages([...messages, { text: message, translated: translatedText }]);
                setMessage('');
            } catch (error) {
                console.error("Translation error:", error);
            }
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSendClick();
        }
    };

    const handleChange = (e) => {
        if (e.target.value.length <= 500) {
            setMessage(e.target.value);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg text-center">
                <h2 className="text-2xl font-semibold mb-4">Chatbot Translator</h2>
                <select 
                    className="mb-4 p-2 border rounded w-full" 
                    value={language} 
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="ja">Japanese</option>
                    <option value="zh">Chinese</option>
                </select>
                <div className="mb-4 max-h-60 overflow-y-auto border p-2 rounded bg-gray-50 text-left">
                    {messages.map((msg, index) => (
                        <div key={index} className="p-2 mb-2 bg-blue-100 rounded">
                            <p className="text-sm text-gray-600">{msg.text}</p>
                            <p className="text-lg font-semibold">{msg.translated}</p>
                        </div>
                    ))}
                </div>
                <input
                    type="text"
                    placeholder="Type your message here..."
                    value={message}
                    onChange={handleChange}
                    onKeyUp={handleKeyPress}
                    className="w-full p-2 border rounded"
                />
                <button 
                    onClick={handleSendClick} 
                    className="mt-2 w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chatbot;
