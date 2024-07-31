import { useFocusEffect } from "@react-navigation/native"
import { useCallback, useState } from "react"
import { FlatList, Text, View } from "react-native"
import { url } from "../utilities/Fetchingfunctions"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Orderitems from "./Ordercomponent"

function Orders({navigation}) {
const [currentorders,setcurrentorders]=useState()
useFocusEffect(useCallback(()=>{
    async function fetchorders(){
        const token=await AsyncStorage.getItem('jwt')
        const data =await fetch(`${url}/order`,{
            method:'GET',
            headers:{'Authorization': `Bearer ${token}`
}
        })
        const res=await data.json()
        setcurrentorders(res.data)
    }
    fetchorders()
},[]))

console.log(currentorders)

    return (
        <View>
            <FlatList data={currentorders} renderItem={({item})=><Orderitems {...item} navigation={navigation} panel={'order'}/> } keyExtractor={(item)=>item.id}/>
        </View>
    )
}

export default Orders
