import React, { useState, useEffect } from "react";
import Peer from "peerjs";
import ReactMarkdown from "react-markdown";
import TextTranslator from "../service/TextTranslator";

const Chat = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [peerId, setPeerId] = useState("");
    const [peer, setPeer] = useState(null);
    const [conn, setConn] = useState(null);
    const [myPeerId, setMyPeerId] = useState("");
    const [language, setLanguage] = useState("en");
    const [isLanguagePopupOpen, setIsLanguagePopupOpen] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState("disconnected"); 

    useEffect(() => {
        const newPeer = new Peer();
        newPeer.on("open", (id) => {
            console.log("My peer ID is: " + id);
            setMyPeerId(id);
        });
        newPeer.on("connection", (connection) => {
            setConnectionStatus("connected");
            connection.on("data", async (data) => {
                const translatedMessage = await translator.translate(data);
                const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                setMessages((prevMessages) => [...prevMessages, { 
                    message: translatedMessage, 
                    received: true,
                    timestamp: timestamp
                }]);
            });
            
            connection.on("close", () => {
                setConnectionStatus("disconnected");
            });
            
            connection.on("error", () => {
                setConnectionStatus("disconnected");
            });
            
            setConn(connection);
        });
        setPeer(newPeer);
        
        return () => {
            if (peer) {
                peer.destroy();
            }
        };
    }, []);

    const translator = new TextTranslator();
    translator.toLang = language;

    const handleSendClick = async () => {
        if (message.trim()) {
            const translatedMessage = await translator.translate(message);
            const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setMessages([...messages, { 
                message: translatedMessage, 
                received: false,
                timestamp: timestamp
            }]);
            if (conn) {
                conn.send(translatedMessage);
            }
            setMessage("");
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSendClick();
        }
    };

    const handleKeyPressPeerId = (event) => {
        if (event.key === "Enter") {
            handleConnectClick();
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
            setConnectionStatus("connecting");
            const connection = peer.connect(peerId);
            
            connection.on("open", () => {
                console.log("Connected to: " + peerId);
                setConnectionStatus("connected");
                setConn(connection);
            });
            
            connection.on("data", async (data) => {
                const translatedMessage = await translator.translate(data);
                const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                setMessages((prevMessages) => [...prevMessages, { 
                    message: translatedMessage, 
                    received: true,
                    timestamp: timestamp
                }]);
            });
            
            connection.on("close", () => {
                setConnectionStatus("disconnected");
            });
            
            connection.on("error", () => {
                setConnectionStatus("disconnected");
            });
        }
    };

    const renderConnectionStatus = () => {
        switch(connectionStatus) {
            case "connected":
                return <span className="text-green-500">● Connected</span>;
            case "connecting":
                return <span className="text-yellow-500">● Connecting...</span>;
            case "disconnected":
            default:
                return <span className="text-red-500">● Disconnected</span>;
        }
    };

    return (
        <div name="chat" className="flex justify-center items-center h-screen bg-base-200">
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
                        </div>
                    </div>
                </dialog>
            </div>
            <div className="w-full max-w-md p-6 bg-base-100 shadow-xl rounded-lg">
                <h2 className="text-2xl font-bold text-center mb-4">Chat Room</h2>
                <div className="mb-4 overflow-y-auto max-h-64">
                    {messages.map((msg, index) => (
                        msg.received ? (
                            <div key={index} className="chat chat-start">
                                <div className="chat-header">
                                    Other
                                    <time className="text-xs opacity-50 ml-2">{msg.timestamp}</time>
                                </div>
                                <div className="chat-bubble chat-bubble-info text-white">
                                    <ReactMarkdown>{msg.message}</ReactMarkdown>
                                </div>
                            </div>
                        ) : (
                            <div key={index} className="chat chat-end">
                                <div className="chat-header">
                                    You
                                    <time className="text-xs opacity-50 ml-2">{msg.timestamp}</time>
                                </div>
                                <div className="chat-bubble bg-blue-500 break-words chatbot-message text-white">
                                    {msg.message}
                                </div>
                            </div>
                        )
                    ))}
                </div>
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
                <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                        <span>Connection Status: {renderConnectionStatus()}</span>
                    </div>
                    <input
                        type="text"
                        placeholder="Enter peer ID..."
                        value={peerId}
                        onChange={handlePeerIdChange}
                        onKeyUp={handleKeyPressPeerId}
                        className="w-full p-2 border rounded input input-bordered"
                    />
                    <button
                        onClick={handleConnectClick}
                        className="btn bg-red-500 hover:bg-red-800 mt-2"
                        disabled={connectionStatus === "connecting"}
                    >
                        {connectionStatus === "connecting" ? "Connecting..." : "Connect"}
                    </button>
                </div>
                <div className="mt-4">
                    <button
                        className="btn bg-blue-500 hover:bg-blue-800 text-white"
                        onClick={() => setIsLanguagePopupOpen(true)}
                    >
                        Select Language
                    </button>
                    {isLanguagePopupOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-4 rounded-lg shadow-lg">
                                <h3 className="text-lg font-bold text-base-200 mb-2">Choose Language</h3>
                                <select
                                    className="p-2 border rounded w-full bg-gray-100 text-black"
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                >
                                    <option value="en">English</option>
                                    <option value="fr">French</option>
                                    <option value="es">Spanish</option>
                                    <option value="de">German</option>
                                    <option value="pt">Portuguese</option>
                                </select>
                                <button
                                    className="btn bg-red-500 hover:bg-red-800 text-white mt-2"
                                    onClick={() => setIsLanguagePopupOpen(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="mt-4">
                    <p>Your Peer ID: {myPeerId}</p>
                </div>
            </div>
        </div>
    );
};

export default Chat;