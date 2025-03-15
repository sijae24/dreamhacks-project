import React, { useState, useEffect } from 'react';
import ConnectionContext from '../service/ConnectionContext';

const Chatbox = () => {
    const [messages, setMessages] = useState([]);
    const [connectionContext, setConnectionContext] = useState(new ConnectionContext());

    useEffect(() => {
        connectionContext.addMessageListener((msg) => {
            console.log(`inc: ${JSON.stringify(msg)}`);
            setMessages((oldState) => {
                let newMessages = [...oldState, msg];
                return newMessages;
            });
            console.log('event listenre ran');
        }
        );
        connectionContext.init();
        console.log("Ran the useEffect");
    }, [])

    let sendMessage = () => {
        let inputElement = document.getElementById("messageTextbox");
        let msg = inputElement.value;
        connectionContext.broadcastMessage(msg);
    };

    let sendConnection = () => {
        let inputElement = document.getElementById("clientIdConnect");
        let clientId = inputElement.value;
        let packet = {
            type: 1,
            data: {
                id: clientId
            }
        }
        connectionContext._handlePacket(packet);
    };

    return (
        <>
            <div className={"Main Chatbox"}>
                {
                    messages.sort((a, b) => a.time < b.time)
                        .map((msg, index) => {
                            if (connectionContext.isCurrentUser(msg.userId)) {
                                return (
                                    <div className={"chat chat-end"} key={index}>
                                        <div className={"chat chat-header"}>
                                            {"You"}
                                            <time className="text-xs opacity-50">{new Date(msg.sendTime).toString()}</time>
                                        </div>
                                        <div className="chat-bubble">{msg.messageText}</div>
                                    </div>
                                )
                            } else {
                                const user = connectionContext.getUserFor(msg.userId);
                                return (
                                    <div className={"chat chat-start"} key={index}>
                                        <div className={"chat chat-header"}>
                                            {user.userName}
                                            <time className="text-xs opacity-50">{new Date(msg.sendTime).toString()}</time>
                                        </div>
                                        <div className="chat-bubble">{msg.messageText}</div>
                                    </div>
                                )
                            }
                        })
                }
            </div>
            <div>
                <input id="messageTextbox" className={"input"} placeholder={"Send message here"} type={"text"} />
                <input id={"message-submit-button"} type="button" className={"btn"} value={"Click here to send"} onClick={sendMessage} />
            </div>
            <div>
                <input id="clientIdConnect" className={"input"} placeholder={"Enter client id to connect to here"} type={"text"} />
                <input id={"client-id-connect-button"} type="button" className={"btn"} value={"click here to connect"} onClick={sendMessage} />
            </div>
        </>
    )
};

export default Chatbox;