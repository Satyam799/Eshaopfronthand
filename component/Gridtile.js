import { Button, Dimensions, Image, Pressable, StyleSheet, Text, View } from "react-native";
const { width } = Dimensions.get("window");
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { Addcart } from "../Store/Cartslice";
import Toast from "react-native-toast-message";
import Easybutton from "../common/Styledcomponent/Easybutton";

function Gridtiles(props) {
  const navigation=useNavigation()
  const dispatch=useDispatch()
  const {
    image,
    brand,
    price,
    rating,
    numReviews,
    isFeatured,
    name,
    category,
    countInStock,
  } = props;

  return (
    <Pressable onPress={()=>{
      navigation.navigate('singleproduct',{items:props})
      }}>
      <View style={styles.container}>
      <Image resizeMode='contain' style={styles.imagestyles} source={{ uri: image }} />

      <View style={styles.card}>
      <Text style={styles.title}>{name.length <15 ? name :name.substring(0,15-3)+'....' }</Text>

        <Text style={styles.pricestyle}>$ {price}</Text>
        {countInStock  > 0 ? <Easybutton primary medium onPress={()=>{
          dispatch(Addcart(props))
          Toast.show({
            topOffset:50,
            type:'success',
            text1:`${name} Added to the cart successfully`,
            text2:'Go to your cart and checjk your order'
          })
          }}><Text style={{fontWeight:'bold',color:'white'}}>Add</Text></Easybutton>: 'Currently Unavailable '}
    </View>
    </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: 180,
    borderRadius: 16,
    marginTop: 70,
    margin: 16,
    width: width / 2 - 40,
    alignItems: "center",
  },
  imagestyles: {
    height: 100,
    width: "100%",
    backgroundColor: "transparent",
    position: "absolute",
    top:-45
},
  card: {
    width: width / 2 - 40 - 10,
    height: 60,
    position: "absolute",
    backgroundColor: "transparent",
    justifyContent:'flex-end',
    alignItems:'center',
    marginTop:100
  },
  title:{
    fontWeight:'bold',
    marginTop:10
  },
  pricestyle:{
    fontSize:20,
    color:'orange',
    marginTop:8
}
});

export default Gridtiles;
