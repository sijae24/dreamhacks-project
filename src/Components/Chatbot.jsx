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
        <div className='flex flex-col items-center'>
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