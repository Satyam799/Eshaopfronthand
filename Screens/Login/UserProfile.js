import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Loginguserout, Logout } from "../../Store/Cartslice";
import { url } from "../../utilities/Fetchingfunctions";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Orderitems from "../../Admin/Ordercomponent";

function UserProfile({ navigation }) {

const [orders,setorders]=useState()

  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.Cart);
  console.log(userProfile)
useEffect(function(){
  async function getorders(){
    const token =await AsyncStorage.getItem('jwt')
   const data=await fetch(`${url}/order`,{
     method:'GET',
     headers:{
       'Authorization':`Bearer ${token}`
     }

   })
   const res= await data.json()
   setorders(res.data) 
  }
  getorders()

},[])
  


  return (
    <View style={styles.anothercontainer}>
      <View >
        <Text style={styles.Textforheading}>{userProfile?.name}</Text>
      </View>
      <View  style={styles.constainer}>
        <Text>Email : {userProfile?.email}</Text>
        <Text>Phone :{userProfile?.phone}</Text>
      </View>
      <Button
        title="Logout"
        onPress={() => {
          dispatch(Loginguserout());
          navigation.navigate("LoginMainscreen");
        }}
      />
      <View style={{marginTop:50}}>
       <Text> My Orders</Text> 
      </View>
      <FlatList data={orders} renderItem={({item})=><Orderitems {...item} navigation={navigation} panel={'userprofile'}/>} keyExtractor={(item)=>item.id}/>
    </View>
  );
}

const styles=StyleSheet.create({
constainer:{
justifyContent:'center',
alignItems:'flex-start',

},
   Textforheading:{
        fontSize:25,
        fontWeight:'bold'
    },
    anothercontainer:{
        alignItems:'center'

    }

})

export default UserProfile;
