import React, { useState, useEffect } from 'react';
import Peer from 'peerjs';
import TextTranslator from '../service/TextTranslator';

const Chatbot = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [peerData, setPeerData] = useState('');
    const [peerTextBox, setPeerTextBox] = useState('');

    // Create an instance of TextTranslator
    const translator = new TextTranslator();
    translator.toLang = 'es'; // Change to desired language

    useEffect(() => {
        // PeerJS setup can go here
    }, []);

    const handleSendClick = async () => {
        if (message.trim()) {
            try {
                const translatedText = await translator.translate(message);
                setMessages([...messages, translatedText]); // Store translated message
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
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-md p-4 text-center">
                <div className="mb-4">
                    {messages.map((msg, index) => (
                        <div key={index} className="bg-gray-200 p-2 rounded mb-2">
                            {msg}
                        </div>
                    ))}
                </div>
                <input
                    type="text"
                    placeholder="Type your message here..."
                    value={message}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    className="w-full p-2 border rounded"
                />
                <button onClick={handleSendClick} className="mt-2 p-2 bg-blue-500 text-white rounded">
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chatbot;
