import FormContainer from "./Form/FormContainer";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Inputcomponent from "./Form/Forminput";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Dimensions, FlatList, SectionList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { Icon } from "@expo/vector-icons/MaterialCommunityIcons";
import Buttonwithstyle from "./Bottomtabscreens/Buttonwithstyles";
const item = require("../../assets/countries.json");

const {width}=Dimensions.get('window')

export default function Checkoutcomponent({navigation}) {
  const Incartitems = useSelector((state) => state.Cart.Cart);
  const [dropdown,setdropdown]=useState(false)
  const [Filteredarray,setfilteredarray]=useState()
  const [cartitems, setcartitems] = useState(Incartitems);
  const [name, setname] = useState();
  const [Addess1, setAddess1] = useState();
  const [Addess2, setAddess2] = useState();
  const [city, setcity] = useState();
  const [Zip, setZip] = useState();
  const [country,setcountry]=useState('')
  const [phoneno,setphoneno]=useState('')

   function  handelchangehandler(text){
      if(text){
        setdropdown(true)
        const datas=item.filter((el)=>el.name.toLowerCase().startsWith(text.toLowerCase()))
        setfilteredarray(datas)

      }else{
        setdropdown(false)
        
      }
}

  function handelseletitem(element){
    setcountry(element)
    setdropdown(false)
    setfilteredarray('')
  }

  function Checkout(){
    const order={
      Name:name,
      ShippingAddress1:Addess1,
      ShippingAddress2:Addess2,
      Phone:phoneno,
      City:city,
      Zipcode:Zip,
      Country:country,
      status:2,

    }
    navigation.navigate('Payment',{order})
  }


  return (<>
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title={"Shipping Address"}>
        <Inputcomponent
          placeholder="Name"
          name={"name"}
          value={name}
          onChangeText={(e) => setname(e)}
        />
        <Inputcomponent
          placeholder="ShppingAddress1"
          name={"ShppingAddress1"}
          value={Addess1}
          onChangeText={(e) => setAddess1(e)}
        />
        <Inputcomponent
          placeholder="Phone"
          name={"Phoneno"}
          value={phoneno}
          onChangeText={(e) => setphoneno(e)}
          keyboardType='numeric'
        />
        <Inputcomponent
          placeholder="ShppingAddress2"
          name={"ShppingAddress2"}
          value={Addess2}
          onChangeText={(e) => setAddess2(e)}
        />

        <Inputcomponent
          placeholder="City"
          name={"City"}
          value={city}
          onChangeText={(e) => setcity(e)}
        />
        <Inputcomponent
          placeholder="Zip"
          name={"Zip"}
          value={Zip}
          onChangeText={(e) => setZip(e)}
          keyboardType={"numeric"}
        />
       
        
        <Inputcomponent 
          placeholder='Countryname'
          name={'County'}
          value={country.name}
          onChangeText={handelchangehandler}
        
        />
        {dropdown && <FlatList data={Filteredarray} 
        renderItem={(item)=> {
          return <TouchableOpacity style={styles.container} onPress={()=>handelseletitem(item.item)}>
            <Text>{item.item.name}</Text>
        </TouchableOpacity>}} 
        keyExtractor={(item)=>item.name}/>}


      </FormContainer>
      <View style={styles.button}>
    <Buttonwithstyle  title='Confirm' pressed={Checkout}/>
    </View>
    </KeyboardAwareScrollView>
 
     </>
  );
}

const styles=StyleSheet.create({

  container:{
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25,
    borderColor:'#c9b2db',
    borderWidth:5,
    width:width*0.8,
    backgroundColor:'#edf5f3'

  },
button:{
    justifyContent:'center',
    alignItems:'center',
    flex:1,
  }
})