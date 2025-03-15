import React, { useState } from 'react';

const Chatbot = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSendClick = () => {
        if (message.trim()) {
            setMessages([...messages, message]);
            setMessage('');
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSendClick();
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full smax-w-md p-4 text-center">
                <div className="mb-4">
                    {messages.map((msg, index) => (
                        <div key={index} className="bg-black-200 p-2 rounded mb-2">
                            {msg}
                        </div>
                    ))}
                </div>
                <input 
                    type="text" 
                    placeholder="Type your message here..." 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
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