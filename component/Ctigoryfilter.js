import { useState } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");

export default function Catigory({item,active,setactive}) {
  return (
    <Pressable onPress={()=>  active!==null && item?.name===active?.name  ? setactive(null) : setactive(item)}>
    <View style={[styles.container,{backgroundColor:active?.name===item?.name ? '#ff00ff' :!active ? '#a7d7f8':'#b8f6f6'}]}>
      <Text>{item.name}</Text>
    </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flexDirection:'column',
    borderRadius:45,
    padding:8,
},
 
  
});
