import Peer from 'peerjs';

class ConnectionContext {
    constructor() {
        this._connected = false;
        this._thisClient = new Peer();
        this._thisClient.on('open', () => {
            this._connected = true;
        });

        this._msgs = [];
        this._clients = new Map();

        this._messageListeners = [];
        this._connectionListeners = [];
    }

    get isConnected() {
        return this._connected;
    }

    addClient(id, client) {
        this._clients.set(id, client);
    }

    get thisClient() { return this._thisClient; }
    get msgs() { return this._msgs; }
    get clients() { return this._clients; }

    addConnectionListener(connListenerFunc) {
        this._connectionListeners.push(connListenerFunc);
    }

    addMessageListener(listenerFunc) {
        this._messageListeners.push(listenerFunc);
    }

    sendMessage(text) {
        // TODO: send message to other clients
    }
}

export default ConnectionContext;