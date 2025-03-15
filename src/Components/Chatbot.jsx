import React, { useState , useEffect} from 'react';
import Peer from 'peerjs'

const Chatbot = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [peer, setPeer] = useState(new Peer());
    const [peerData, setPeerData] = useState('');
    const [peerTextBox ,setPeerTextBox] = useState('');

    // Receiving end
    useEffect(() => {
        peer.on('open', function(id) {
            console.log(`Id: ${id}`);
            
            peer.on('connection', function (con) {
                con.on('data', function (data) {
                    console.log('Incoming data: ', data);
                    setPeerData(JSON.stringify(data));
                    con.send('REPLY');
                });
            });
        });
  
    }, []);
    
    const handleSendClick = () => {
        if (message.trim()) {
            setMessages([...messages, message]);
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

    const sendMsg = () => {
        let con = peer.connect(document.getElementById('textbox-id').value);
        con.on('open', () => {
            console.log(`Successfully connected to peer ${document.getElementById('textbox-id').value}`)
            con.send("This is some text that I decided to send you!!");
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
                    onKeyPress={handleKeyPress}
                    className="w-full p-2 border rounded"
                />
                <button onClick={handleSendClick} className="mt-2 p-2 bg-blue-500 text-white rounded">
                    Send
                </button>
            </div>
            <input id="textbox-id" type="text" style={{width: '200px'}}></input>
            <button onClick={sendMsg}>Send msg</button>
            <div>{peerData}</div>
        </div>
    );
};

export default Chatbot;