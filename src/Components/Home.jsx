import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { generateContent } from './Model'; 
import ReactMarkdown from 'react-markdown'; // to render markdown responses

export default function Home() {
    const [userInput, setUserInput] = useState('');
    const [response, setResponse] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleUserInput = (e) => {
        setUserInput(e.target.value);
    };

    const handleClear = () => {
        setUserInput('');
        setResponse([]);
        setIsLoading(false);
    };

    const handleSubmit = async () => {
        if (!userInput.trim()) {
            setResponse([{ type: "system", message: "Please enter a prompt.." }]);
            return;
        }

        setIsLoading(true);
        try {
            const res = await generateContent(userInput);
            setResponse(prevResponse => [
                ...prevResponse,
                { type: "user", message: userInput },
                { type: "bot", message: res() },
            ]);
            setUserInput('');
        } catch (err) {
            console.error("Error generating response:", err);
            setResponse(prevResponse => [
                ...prevResponse,
                { type: "system", message: "Failed to generate response" },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-md p-4 text-center">
                {response.length === 0 ? (
                    <div className="heading mb-4">Got Questions? Chatty's Got Answers.</div> 
                ) : (
                    <div className="chat-history mb-4">
                        {response.map((msg, index) => (
                            msg.type === "user" ? (
                                <div key={index} className="chat chat-start">
                                    <div className="chat-bubble break-words">
                                        {msg.message}
                                    </div>
                                </div>
                            ) : (
                                <div key={index} className="chat chat-end">
                                    <div className="chat-bubble chat-bubble-info">
                                        <ReactMarkdown>{msg.message}</ReactMarkdown>
                                    </div>
                                </div>
                            )
                        ))}
                        {isLoading && <p className="loading-text">Generating response...</p>}
                    </div>
                )}

                <div className="input-container">
                    <button onClick={handleClear} className="clear-btn btn mt-2 p-2 bg-red-500 text-white rounded">Clear</button>

                    <input
                        type="text"
                        value={userInput}
                        onChange={handleUserInput}
                        onKeyDown={handleKeyPress}
                        placeholder="Type your message here..."
                        className="w-full p-2 border rounded mt-2"
                    />

                    <button onClick={handleSubmit} className="send-btn mt-2 p-2 bg-blue-500 text-white rounded">
                        <IoIosSend />
                    </button>
                </div>
            </div>
        </div>
    );
}