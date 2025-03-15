export default class User {
    constructor(connection) {
        this._connection = connection;
    }
    
    get peerId() {
        return this._connection.id;
    }

    get connection() {
        return this._connection;
    }

    sendMessage(text) {
        this._connection.send(text);
    }
}