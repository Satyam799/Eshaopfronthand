import { Pressable, StyleSheet, Text, View } from "react-native";


export default function Buttonwithstyle({title,pressed}){
    
    return <Pressable onPress={pressed} style={styles.buttonstyling} >
        <Text style={styles.text} >{title}</Text>
    </Pressable>
}

const styles=StyleSheet.create({
    buttonstyling:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#e688f2',
    borderRadius:50,
    padding:10
    },
    
    text:{
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center'
    }

})