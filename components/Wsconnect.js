import store from "../store"


export default function Wsconnect(ipaddress){
    try {
        store.setWebSocket(new WebSocket('ws://' + ipaddress + ':81'))
        store.webSocket.onopen = () => {
            store.webSocket.send(JSON.stringify({
                id: '1',
                username: 'userArduino',
                method: "connection"
            }))
        }
        store.webSocket.onmessage = (event) => {
            let msg = JSON.parse(event.data)
            if (store.webSocket.readyState !== 0) {
                switch (msg.method) {
                    case "connection":
                        console.log(`пользователь ARDUINO ${msg.username} присоединился`)
                        // console.log(msg.txt)
                        // console.log("store.degreegoback: " + msg.degreegoback)
                        // console.log("store.degreeleftright: " + msg.degreeleftright)
                        // console.log("store.delaycommand: " + msg.delaycommand)
                        // console.log("store.accel: " + msg.accel)
                        break
                    case "messages":
                        console.log(msg.message + '  ' + msg.message2)
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
