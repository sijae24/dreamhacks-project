export default class Message {

    constructor(userId, time, messageText) {
        this._userId = userId;
        this._messageText = messageText;
        this._time = time;
    }

    get messageText() {
        return this._messageText;
    }

    get userId() {
        return this._userId;
    }

    get sendTime() {
        return this._time;
    }
};