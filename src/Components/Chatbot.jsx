import React, { useState, useEffect } from 'react';
import Peer from 'peerjs';

const Chatbot = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [peer, setPeer] = useState(new Peer());
    const [peerId, setPeerId] = useState('');
    const [myPeerId, setMyPeerId] = useState('');

    // Receiving end
    useEffect(() => {
        peer.on('open', function(id) {
            console.log(`My peer ID is: ${id}`);
            setMyPeerId(id);
            
            peer.on('connection', function (con) {
                con.on('data', function (data) {
                    console.log('Incoming data: ', data);
                    setMessages(prevMessages => [...prevMessages, data]);
                });
            });
        });
    }, [peer]);

    const handleSendClick = () => {
        if (message.trim()) {
            setMessages([...messages, message]);
            setMessage('');
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSendClick();
            sendMsg();
        }
    };

    const handleChange = (e) => {
        if (e.target.value.length <= 500) {
            setMessage(e.target.value);
        }
    };

    const handlePeerIdChange = (e) => {
        setPeerId(e.target.value);
    };

    const sendMsg = () => {
        let con = peer.connect(peerId);
        con.on('open', () => {
            console.log(`Successfully connected to peer ${peerId}`);
            con.send(message);
            setMessages([...messages, message]);
            setMessage('');
        });
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-md p-4 text-center">
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
                    onChange={handleChange} 
                    onKeyUp={handleKeyPress}
                    className="w-full p-2 border rounded"
                />
                <input 
                    type="text" 
                    placeholder="Enter peer ID..." 
                    value={peerId} 
                    onChange={handlePeerIdChange} 
                    className="w-full p-2 border rounded mt-4"
                />
                <button onClick={sendMsg} className="mt-2 p-2 bg-blue-500 text-white rounded">
                    Connect and Send Message
                </button>
                <div className="mt-4">
                    <strong>Your Peer ID: </strong>{myPeerId}
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
