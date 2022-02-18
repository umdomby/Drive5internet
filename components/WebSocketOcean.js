import store from "../store";

const WebSocketOcean = (idKey) => {

    try {
        store.setWebSocketOcean(new WebSocket('wss://umdom.by:4433'))
        store.webSocketOcean.onopen = () => {
            store.webSocketOcean.send(JSON.stringify({
                id: Number(idKey),
                username: 'userOcean',
                method: "connection"
            }))
        }
        store.webSocketOcean.onmessage = (event) => {
            var s = event.data.replace(/\\n/g, "\\n")
                .replace(/\\'/g, "\\'")
                .replace(/\\"/g, '\\"')
                .replace(/\\&/g, "\\&")
                .replace(/\\r/g, "\\r")
                .replace(/\\t/g, "\\t")
                .replace(/\\b/g, "\\b")
                .replace(/\\f/g, "\\f");
            s = s.replace(/[\u0000-\u0019]+/g, "");
            let msg = JSON.parse(s)
            if (store.webSocketOcean.readyState === store.webSocketOcean.OPEN) {
                switch (msg.method) {
                    case "connection":
                        console.log(`пользователь OCEAN ${msg.username} присоединился`)
                        break
                    case "messages":
                        console.log(msg.message + '  ' + msg.message2)
                        if (store.webSocket.readyState === store.webSocket.OPEN) {
                            store.webSocket.send(JSON.stringify({
                                method: 'messages',
                                username: 'user',
                                message: msg.message,
                                message2: msg.message2,
                            }))
                        }
                        break
                    default:
                }
            }
        }
    }catch (e) {
        console.log(e)
    }

    return([])

}
export default WebSocketOcean
