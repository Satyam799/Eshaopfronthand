import { StyleSheet, Text, View } from "react-native";

export default function Error({message}){

    return <View style={styles.container}>
        <Text style={styles.teststyle}>{message}</Text>
    </View>
}

const styles=StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        padding:20
    },
    teststyle:{
        fontWeight:'bold',
        fontSize:12
    }
})