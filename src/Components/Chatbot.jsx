<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import Peer from 'peerjs';
import TextTranslator from '../service/TextTranslator';
=======
import React, { useState, useEffect } from "react";
import Peer from "peerjs";
import ReactMarkdown from "react-markdown";
>>>>>>> main

const Chatbot = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
<<<<<<< HEAD
    const [language, setLanguage] = useState('es'); // Default language: Spanish
=======
    const [peerId, setPeerId] = useState("");
    const [peer, setPeer] = useState(null);
    const [conn, setConn] = useState(null);
    const [myPeerId, setMyPeerId] = useState("");

    useEffect(() => {
        const newPeer = new Peer();
        newPeer.on("open", (id) => {
            console.log("My peer ID is: " + id);
            setMyPeerId(id);
        });
        newPeer.on("connection", (connection) => {
            connection.on("data", (data) => {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { message: data, received: true },
                ]);
            });
            setConn(connection);
        });
        setPeer(newPeer);
    }, []);
>>>>>>> main

    // Create an instance of TextTranslator
    const translator = new TextTranslator();
    translator.toLang = language;

    useEffect(() => {
        // PeerJS setup can go here
    }, []);

    const handleSendClick = async () => {
        if (message.trim()) {
<<<<<<< HEAD
            try {
                const translatedText = await translator.translate(message);
                setMessages([...messages, { text: message, translated: translatedText }]);
                setMessage('');
            } catch (error) {
                console.error("Translation error:", error);
            }
=======
            setMessages([...messages, { message, received: false }]);
            if (conn) {
                conn.send(message);
            }
            setMessage("");
>>>>>>> main
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
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
            connection.on("open", () => {
                console.log("Connected to: " + peerId);
                setConn(connection);
            });
            connection.on("data", (data) => {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { message: data, received: true },
                ]);
            });
        }
    };

    return (
<<<<<<< HEAD
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
=======
        <div className="flex justify-center items-center h-screen bg-base-200">
            {/* Modal for Tips how to use */}
            <div className="fixed bottom-4 right-4 z-50">
                <button
                    className="btn bg-red-500 hover:bg-red-800"
                    onClick={() => document.getElementById("my_modal_1").showModal()}
                >
                    Tips
                </button>
                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Start Chatting!</h3>
                        <p className="py-4 text-md">
                            You can start chatting by typing your message in the input field.
                        </p>
                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn bg-red-500 hover:bg-red-800">Close</button>
                            </form>
>>>>>>> main
                        </div>
                    </div>
                </dialog>
            </div>
            <div className="w-full max-w-md p-6 bg-base-100 shadow-xl rounded-lg">
                <h2 className="text-2xl font-bold text-center mb-4">Chat Room</h2>

                {/* Chat Messages */}
                <div className="mb-4 overflow-y-auto max-h-64">
                    {messages.map((msg, index) => (
                        msg.received ? (
                            <div key={index} className="chat chat-end">
                                <div className="chat-bubble chat-bubble-info text-white">
                                    <ReactMarkdown>{msg.message}</ReactMarkdown>
                                </div>
                            </div>
                        ) : (
                            <div key={index} className="chat chat-start">
                                <div className="chat-bubble bg-blue-500 break-words chatbot-message text-white">
                                    {msg.message}
                                </div>
                            </div>
                        )
                    ))}
                </div>
<<<<<<< HEAD
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
=======

                {/* Input Field */}
                <div className="flex flex-col space-y-2">
                    <input
                        type="text"
                        placeholder="Type your message here..."
                        value={message}
                        onChange={handleChange}
                        onKeyUp={handleKeyPress}
                        className="w-full p-2 border rounded input input-bordered"
                    />
                    <button
                        onClick={handleSendClick}
                        className="btn bg-red-500 hover:bg-red-800"
                    >
                        Send
                    </button>
                </div>

                {/* Peer ID Input */}
                <div className="mt-4">
                    <input
                        type="text"
                        placeholder="Enter peer ID..."
                        value={peerId}
                        onChange={handlePeerIdChange}
                        className="w-full p-2 border rounded input input-bordered"
                    />
                    <button
                        onClick={handleConnectClick}
                        className="btn bg-red-500 hover:bg-red-800 mt-2"
                    >
                        Connect
                    </button>
                </div>

                {/* Display My Peer ID */}
                <div className="mt-4">
                    <p>Your Peer ID: {myPeerId}</p>
                </div>
>>>>>>> main
            </div>
        </div>
    );
};

export default Chatbot;
