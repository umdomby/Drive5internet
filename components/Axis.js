import {StyleSheet, View} from "react-native";
import React from "react";
import AxisPad from "./AxisPad";
import store from "../store"

const Axis = () => {

    // const [axisX, setAxisX] = useState(0)
    // const [axisY, setAxisY] = useState(0)
    // const [value, setValue] = useState(0);

    const sendMessage = (x,y) => {
        if(store.webSocket.readyState === 1 ) {
            store.webSocket.send(JSON.stringify({
                method: 'messages',
                username: 'user',
                message: x,
                message2: y,
            }))
        }
    }

    return (
        <View style={styles.container}>
            <View>
                <AxisPad
                    resetOnRelease={true}
                    autoCenter={true}
                    onValue={({ x, y }) => {
                        // setAxisX(x)
                        // setAxisY(y)
                        sendMessage(x, y)
                        // values are between -1 and 1
                        //console.log(x + '---' + y);
                    }}
                />
            </View>
            {/*<Text>{axisX}</Text>*/}
            {/*<Text>{axisY}</Text>*/}
            {/*<Button title={'socket'} onPress={()=>{sendMessage(123)}}/>*/}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Axis
