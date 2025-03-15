import React, { useState } from 'react';

const Chatbot = () => {
    const [message, setMessage] = useState('');

    const handleSendClick = () => {
        setMessage('');
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSendClick();
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>Chatbot</h1>
            <input 
                type="text" 
                placeholder="Type your message here..." 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                onKeyPress={handleKeyPress}
            />
            <button onClick={handleSendClick}>Send</button>
        </div>
    );
};

export default Chatbot;