export default class User {
    constructor(peerId) {
        this._peerId = peerId;
    }
    
    get peerId() {
        return this._connection.id;
    }

    get userName() {
        return this._peerId;
    }
}