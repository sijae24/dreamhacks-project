import React, { useState, useEffect } from "react";
import Peer from "peerjs";
import ReactMarkdown from "react-markdown";
import TextTranslator from "../service/TextTranslator";

const Chatbot = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [peerId, setPeerId] = useState("");
    const [peer, setPeer] = useState(null);
    const [conn, setConn] = useState(null);
    const [myPeerId, setMyPeerId] = useState("");
    const [language, setLanguage] = useState("en");
    const [isLanguagePopupOpen, setIsLanguagePopupOpen] = useState(false);

    useEffect(() => {
        const newPeer = new Peer();
        newPeer.on("open", (id) => {
            console.log("My peer ID is: " + id);
            setMyPeerId(id);
        });
        newPeer.on("connection", (connection) => {
            connection.on("data", async (data) => {
                const translatedMessage = await translator.translate(data);
                setMessages((prevMessages) => [...prevMessages, { message: translatedMessage, received: true }]);
            });
            setConn(connection);
        });
        setPeer(newPeer);
    }, []);

    const translator = new TextTranslator();
    translator.toLang = language;

    const handleSendClick = async () => {
        if (message.trim()) {
            const translatedMessage = await translator.translate(message);
            setMessages([...messages, { message: translatedMessage, received: false }]);
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
            connection.on("data", async (data) => {
                const translatedMessage = await translator.translate(data);
                setMessages((prevMessages) => [...prevMessages, { message: translatedMessage, received: true }]);
            });
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-base-200">
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
                                <h3 className="text-lg font-bold mb-2">Choose Language</h3>
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

export default Chatbot;