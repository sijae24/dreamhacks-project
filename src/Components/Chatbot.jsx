import React, { useState, useEffect } from 'react';
import Peer from 'peerjs';
import ReactMarkdown from 'react-markdown';

const Chatbot = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [peerId, setPeerId] = useState('');
    const [peer, setPeer] = useState(null);
    const [conn, setConn] = useState(null);
    const [myPeerId, setMyPeerId] = useState('');

    useEffect(() => {
        const newPeer = new Peer();
        newPeer.on('open', id => {
            console.log('My peer ID is: ' + id);
            setMyPeerId(id);
        });
        newPeer.on('connection', connection => {
            connection.on('data', data => {
                setMessages(prevMessages => [...prevMessages, { message: data, received: true }]);
            });
            setConn(connection);
        });
        setPeer(newPeer);
    }, []);

    const handleSendClick = () => {
        if (message.trim()) {
            setMessages([...messages, { message, received: false }]);
            if (conn) {
                conn.send(message);
            }
            setMessage('');
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

    const handlePeerIdChange = (e) => {
        setPeerId(e.target.value);
    };

    const handleConnectClick = () => {
        if (peer && peerId.trim()) {
            const connection = peer.connect(peerId);
            connection.on('open', () => {
                console.log('Connected to: ' + peerId);
                setConn(connection);
            });
            connection.on('data', data => {
                setMessages(prevMessages => [...prevMessages, { message: data, received: true }]);
            });
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-md p-4 text-center">
                <div className="mb-4">
                    {messages.map((msg, index) => (
                        msg.received ? (
                            <div key={index} className="chat chat-end">
                                <div className="chat-bubble chat-bubble-info">
                                    <ReactMarkdown>{msg.message}</ReactMarkdown>
                                </div>
                            </div>
                        ) : (
                            <div key={index} className="chat chat-start">
                                <div className="chat-bubble break-words">
                                    {msg.message}
                                </div>
                            </div>
                        )
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
                <button onClick={handleSendClick} className="mt-2 p-2 bg-blue-500 text-white rounded">
                    Send
                </button>
                <div className="mt-4">
                    <input 
                        type="text" 
                        placeholder="Enter peer ID..." 
                        value={peerId} 
                        onChange={handlePeerIdChange} 
                        className="w-full p-2 border rounded"
                    />
                    <button onClick={handleConnectClick} className="mt-2 p-2 bg-blue-500 text-white rounded">
                        Connect
                    </button>
                </div>
                <div className="mt-4">
                    <p>Your Peer ID: {myPeerId}</p>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;