import Peer from 'peerjs';
import Message from './Message';
import User from './User';

class ConnectionContext {
    constructor() {
        this._connected = false;

        this._userId = null;
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
            this._userId = id;
            console.log(`user id is: ${this._userId}`);

            for (const listener of this._serverConnectionListeners) {
                listener(this._peerInstance);
            }

            this._peerInstance.on('connection', (con) => {
                console.log("accepted conn");
                this._addConnection(con);
            });
        });
    }

    get isConnected() {
        return this._connected;
    }

    get peerId() {
        return this.isConnected() ? null : this._userId;
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
        if (this._userId == null)
            return;

        // TODO: send message to other clients
        let msg = new Message(this._userId, Date.now(), text);

        for (let { user, conn } of this._users.values()) {
            let packet = {
                type: 0,
                data: {
                    time: Date.now(),
                    content: text
                }
            }
            conn.send(JSON.stringify(packet));
        }

        this._msgs.push(msg);

        for(const msgListener of this._messageListeners) {
            msgListener(msg);
        }
    }

    _addUser(con) {
        let user = new User(con);
        this._users.set(con.id, { user, con });
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

    _handlePacket(userFrom, packet) {
        switch (packet.type) {
            case 0:
                // message packet
                let msg = new Message(userFrom.peerId, packet.data.time, packet.data.content);
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
                console.log("send conn");
                break;
        }
    }

    isCurrentUser(peerId) {
        return peerId === this._userId;
    }

    getUserFor(peerId) {
        return this._users.get(peerId).user;
    }
}

export default ConnectionContext;