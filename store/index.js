import {makeAutoObservable} from "mobx";

class Index {

    constructor() {
        this._webSocket = {}
        this._webSocketOcean = {}
        this._modalVisible = false
        makeAutoObservable(this)
    }

    get webSocket() {
        return this._webSocket;
    }
    setWebSocket(value) {
        this._webSocket = value;
    }

    get webSocketOcean() {
        return this._webSocketOcean;
    }
    setWebSocketOcean(value) {
        this._webSocketOcean = value;
    }

    get modalVisible() {
        return this._modalVisible;
    }
    setModalVisible(value) {
        this._modalVisible = value;
    }

}

export default new Index()
