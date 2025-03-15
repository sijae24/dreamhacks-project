import Peer from 'peerjs';

class ConnectionContext {
    constructor(thisClient) {
        this._thisClient = thisClient;
        this._msgs = [];
        this._clients = new Map();
    }

    addMessage(msg){
        this._msgs.push(msg);
    }

    addClient(id, client) {
        this._clients.set(id, client);
    }

    get thisClient() { return this._thisClient; }
    get msgs() { return this._msgs; }
    get clients() { return this._clients; }
}

export default ConnectionContext;