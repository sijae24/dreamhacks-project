export default class Message {

    constructor(user, time, messageText) {
        this._user = user;
        this._messageText = messageText;
        this._time = time;
    }

    get user() {
        return this._user;
    }

    get sendTime() {
        return this._time;
    }
};