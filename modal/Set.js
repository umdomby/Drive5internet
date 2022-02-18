import { StatusBar } from 'expo-status-bar';
import {Alert, Modal, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Wsconnect from "../components/Wsconnect";
import store from "../store"

export default function Set() {

    const [modalVisible, setModalVisible] = useState(false);
    const [ipAddress, setIpAddress] = useState('');
    var interval;

    useEffect(async () => {
        try {
            const value = await AsyncStorage.getItem('@storage_Key')
            if (value !== null) {
                setIpAddress(value)
                interval = setInterval(() => socketTest(value), 5000)
                return () => clearInterval(interval);
            }
        } catch (e) {
            // error reading value
        }
    },[])

    if(store.webSocket.readyState !== 1 ) {
        if( modalVisible === false) {
            if(ipAddress.length > 10) {
                Wsconnect(ipAddress)
            }
        }
    }

    const socketTest = (value) => {
        if (store.webSocket.readyState === store.webSocket.CLOSED || store.webSocket.readyState === store.webSocket.CLOSING) {
            Wsconnect(value)
            console.log('socketTest store.webSocket arduino')
        }
    }

    const hideModal = async () => {
        try {
            if(ipAddress.length > 10) {
                await AsyncStorage.setItem('@storage_Key', ipAddress)
            }
        } catch (e) {
            console.log('eeeee ' + e)
            // saving error
        }
        store.setModalVisible(false)
        setModalVisible(false)
        if(store.webSocket.readyState === 1 ) {
            store.webSocket.close()
        }
        Wsconnect(ipAddress)
    }

    const setButton = () => {
        clearInterval(interval)
        setModalVisible(true)
        store.setModalVisible(true)
        if(store.webSocket.readyState === 1 ) {
            store.webSocket.close()
        }
    }

    return (
        <View style={styles.centeredView}>
            <StatusBar style="auto" />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    store.setModalVisible(false);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TextInput
                            style={styles.modalText}
                            onChangeText={setIpAddress}
                            value={ipAddress}
                            placeholder="input ip address"
                        />
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={hideModal}
                        >
                            <Text style={styles.textStyle}>Hide Set</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={setButton}
            >
                <Text style={styles.textStyle}>Set</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        // flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        // marginTop: 22
        marginBottom: 5
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});
