import { StyleSheet, TextInput } from "react-native";


export default function Inputcomponent(props){
    return (
        <TextInput 

        style={styles.input}

        placeholder={props.placeholder}
        name={props.name}
        id={props.id}
        value={props.value}
        autoCorrect={props.autoCorrect}
        onChangeText={props.onChangeText}
        onFocus={props.onFocus}
        secureTextEntry={props.secureTextEntry}
        keyboardType={props.keyboardType}
        
        />
    )
}

const styles=StyleSheet.create({
    input:{
        width:'80%',
        height:60,
        backgroundColor:'white',
        margin:10,
        borderRadius:20,
        padding:10,
        borderWidth:2,
        borderColor:'orange'
    }
})