import React, { useState } from 'react';

const Aichat = () => {
    const [prompt, setPrompt] = useState('');
    const [responseText, setResponseText] = useState('');
    const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;

    if (!apiKey) {
        console.error('API Key is missing');
    }

    const generateContent = async () => {
        console.log('Generating content' + prompt);
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }]
            })
        });

        const data = await response.json();
        if (data.candidates && data.candidates[0] && data.candidates[0].output) {
            setResponseText(data.candidates[0].output);
        } else {
            console.error('Unexpected response format:', data);
            setResponseText('Error: Unexpected response format');
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSendClick();
        }
    };

    const handleSendClick = () => {
        generateContent();
        setPrompt('');
    }

    return (
        <div>
            <h1>AI Chat</h1>
            <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyUp={handleKeyPress}
                placeholder="Enter your prompt"
            />
            <button onClick={handleSendClick}>Send</button>
            <div>
                <h2>Response:</h2>
                <p>{responseText}</p>
            </div>
        </div>
    );
}

export default Aichat;