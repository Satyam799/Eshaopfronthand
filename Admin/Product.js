import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { url } from "../utilities/Fetchingfunctions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ListItems from "./ListItems";
import { SafeAreaView } from "react-native-safe-area-context";
import Easybutton from "../common/Styledcomponent/Easybutton";
import Icons from "../component/Icons";

const {width}=Dimensions.get('window')


function ListHadder(){
  return (
    <View style={styles.constainer}>
      <View style={styles.itemstyling}></View>
      <View style={styles.itemstyling}>
        <Text style={{fontWeight:600}}>Brand</Text>
      </View>
      <View style={styles.itemstyling}>
        <Text style={{fontWeight:600}}>Name</Text>
      </View>
      <View style={styles.itemstyling}>
        <Text style={{fontWeight:600}}>Category</Text>
      </View>
      <View style={styles.itemstyling}>
        <Text style={{fontWeight:600}}>Price</Text>
      </View>
    </View>
  );
}

function Products({ navigation }) {
  const [productlist, setproductlist] = useState();
  const [filter,setfilter]=useState();
  const [token, settoken] = useState();
  const [isloading, setisloading] = useState(true);





  useFocusEffect(
    useCallback(() => {
      async function Productdata() {
        const tokenn = await AsyncStorage.getItem("jwt");
        settoken(tokenn);
        try{
        const dataa = await fetch(`${url}/product`);
        const res = await dataa.json();
        setproductlist(res.data);
        }catch(err){
          console.log(err)
        }finally{
          setisloading(false);

        }
      }
      Productdata();
    }, [])
  );

  navigation.setOptions({
    headerSearchBarOptions: {
      placeholder: "Search....",
      onChangeText:(e)=>{
        setfilter( productlist.filter((el)=>el.name.toLowerCase().trim().startsWith(e.nativeEvent.text.toLowerCase().trim())))

    }
    },
  });
if(isloading) return <View style={styles.ActivityIndicator} >
<ActivityIndicator size={'large'} color={'red'} />
</View>
  return (
    <View style={{flex:1}}>
    <View style={styles.stylingflat}>
    <View style={styles.buttonstyle}>
      <Easybutton medium secondry onPress={()=>navigation.navigate('Orders')}>
        <Icons name='shopping-bag' size={18} color={'white'}/>
        <Text style={styles.buttontext}>Orders</Text>
      </Easybutton>
      <View style={{width:30}}/>
      <Easybutton medium secondry onPress={()=>navigation.navigate('Productform')}>
        <Icons name='plus' size={18} color={'white'}/>
        
        <Text style={styles.buttontext}>Products</Text>
      </Easybutton>
      <View style={{width:30}}/>

      <Easybutton medium secondry onPress={()=>navigation.navigate('Catigories')}>
        <Icons name='plus' size={18} color={'white'}/>
        <Text style={styles.buttontext}>Categories</Text>
      </Easybutton>
    </View>
      <FlatList data={!filter? productlist : filter} ListHeaderComponent={ListHadder} renderItem={({item,index})=><ListItems {...item} navigation={navigation} index={index} setproductlist={setproductlist}/>} key={Date.now()}/>
    </View>
    </View>
  );
}

const styles=StyleSheet.create({
constainer:{
flexDirection:'row',
padding:5,
backgroundColor:'white'
},
itemstyling:{
  width:width/6
},
ActivityIndicator:{
  justifyContent:'center',
  alignItems:'center',
  flex:1
},
stylingflat:{
marginTop:150,

},
buttonstyle:{

  flexDirection:'row',
  justifyContent:'center',
  alignItems:'center',
  },
  buttontext:{
    justifyContent:'center',
    alignItems:'center',
    paddingLeft:5
    
    }
})


export default Products;
