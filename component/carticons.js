import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

export default function Carticons( ) {

const cart=useSelector(state=>state.Cart.Cart) 
  return (
    <View style={styles.circle}>
      <Text style={styles.number}>{cart.length}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 15,
    height: 15,
    borderRadius: 25,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
