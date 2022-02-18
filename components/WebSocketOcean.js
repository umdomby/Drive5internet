import store from "../store";


const WebSocketOcean = () => {

    try {
        store.setWebSocketOcean(new WebSocket('wss://umdom.by:4433'))
        store.webSocketOcean.onopen = () => {
            store.webSocketOcean.send(JSON.stringify({
                id: 4,
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
                        console.log(`пользователь ${msg.username} присоединился`)
                        //setVariable(msg.method)
                        break
                    case "messages":
                        console.log(msg.message + '  ' + msg.message2)
                        if (store.webSocket.readyState === store.webSocket.OPEN) {
                            store.webSocket.send(JSON.stringify({
                                method: 'messages',
                                id: 5,
                                date: Date.now(),
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



    // const socketTest = () => {
    //     if (store.webSocketOcean.readyState === store.webSocketOcean.CLOSED || store.webSocketOcean.readyState === store.webSocketOcean.CLOSING) {
    //         wsConnect()
    //         console.log('WebSocket reconnected ' + 'user')
    //     }
    // }

    // const sendMessage = () => {
    //     if(store.webSocketOcean.readyState === store.webSocketOcean.OPEN) {
    //         store.webSocketOcean.send(JSON.stringify({
    //             id: 4,
    //             method: 'messages',
    //             message: 0.5,
    //             message2: 0.5,
    //             stop: 0
    //         }))
    //     }
    // }

    return([])

}
export default WebSocketOcean
