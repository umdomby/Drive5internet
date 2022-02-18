import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Axis from "./components/Axis";
import Set from "./modal/Set";
import WebSocketOcean from "./components/WebSocketOcean";



export default function App() {

  return (
      <View style={styles.container}>
          <Axis/>
          <Set/>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 20,
  },

});
