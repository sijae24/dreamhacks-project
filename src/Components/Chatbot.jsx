import React, { useState } from "react";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSendClick = () => {
    if (message.trim()) {
      setMessages([...messages, message]);
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

  return (
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
            <p className="py-4 text-md">You can start chatting by typing your message in the input field.</p>
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

        {/* Chat Messages */}
        <div className="mb-4 overflow-y-auto max-h-64">
          {messages.map((msg, index) => (
            <div key={index} className="chat chat-start">
              <div className="chat-bubble bg-blue-500 break-words chatbot-message">
                {msg}
              </div>
            </div>
          ))}
        </div>

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
      </div>
    </div>
  );
};

export default Chatbot;
