import Peer from 'peerjs';
import User from './User';
import Message from './Message';

class ConnectionContext {
    constructor() {
        this._connected = false;

        this._msgs = [];
        this._users = new Map();

        this._messageListeners = [];
        this._clientConnectionListeners = [];
        this._serverConnectionListeners = [];
    }

    init() {
        this._peerInstance = new Peer();

        this._peerInstance.on('open', (id) => {
            this._connected = true;
            for (const listener of this._serverConnectionListeners) {
                listener(this._peerInstance);
            }

            this._peerInstance.on('connection', (con) => {
                this._addConnection(con);
            });
        });
    }

    get isConnected() {
        return this._connected;
    }

    get msgs() { return this._msgs; }
    get clients() { return this._users; }

    addClientConnectionListener(connListenerFunc) {
        this._clientConnectionListeners.push(connListenerFunc);
    }

    addMessageListener(listenerFunc) {
        this._messageListeners.push(listenerFunc);
    }

    addServerConnectionListener(listener) {
        this._serverConnectionListeners.push(listener);
    }

    broadcastMessage(text) {
        // TODO: send message to other clients
    }

    _addUser(con) {
        let user = new User(con);
        this._users.set(con.id, user);
        return user;
    }

    _addConnection(con) {
        let user = this._addUser(con);
        for (let clientConnectionListener of this._clientConnectionListeners) {
            clientConnectionListener(user);
        }
        con.on('data', (data) => {
            this._handlePacket(user, JSON.parse(data));
        });
    }

    _handlePacket(user, packet) {
        switch (packet.type) {
            case 0:
                // message packet
                let msg = new Message(user, packet.data.time, packet.data.content);
                this._msgs.push(msg);

                for(let messageListeneer of this._messageListeners) {
                    messageListeneer(msg);
                }
                break;
            case 1:
                // new connection packet (broadcasted from other user)
                let peerId = packet.data.id;
                let conn = this._peerInstance.connect(peerId);
                this._addConnection(conn);
                break;
        }
    }
}

export default ConnectionContext;