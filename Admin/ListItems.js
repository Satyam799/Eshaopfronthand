import { useState } from "react";
import {
    Button,
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import Icons from "../component/Icons";
import { Handelscreen } from "../App";
import Easybutton from "../common/Styledcomponent/Easybutton";
import { url } from "../utilities/Fetchingfunctions";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

function ListItems(props) {
  const [Modalvisinle, setmodalvisible] = useState(false);
  async function Deleteing(){
    const token=await AsyncStorage.getItem('jwt')
    const deleteditem=await fetch(`${url}/product/${props._id}`,{
      method:'DELETE',
      headers:{
        'Authorization': `Bearer ${token}`,
      }
    })
    setmodalvisible(false)

    props.setproductlist((data)=>data?.filter((el)=>el._id !== props._id))
  }


  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={Modalvisinle}
        onRequestClose={() => setmodalvisible(false)}
      >
        <View style={styles.centering}>
            <View style={styles.makingcard}>
                <TouchableOpacity 
                underlayColor='#E8E8E8' 
                onPress={()=>setmodalvisible(false)}
                style={{
                    alignSelf:'flex-end',
                    position:'absolute',
                    top:5,
                    right:10
                }}
                >
                    <Icons name={'close'} size={24} onPress={()=>setmodalvisible(false)}/>
                </TouchableOpacity>
                <Easybutton
                medium 
                secondry
                onPress={()=>{
                   props.navigation.navigate('Productform',{items:props}) 
                   setmodalvisible(false)
                }}>
                  <Text>Edit</Text>
                </Easybutton>
                
                <Easybutton onPress={Deleteing} medium dangerous>
                <Text>Delete</Text>
                </Easybutton>
            </View>
        </View>
      </Modal>
    
      <TouchableOpacity
      onPress={()=>Handelscreen(props.navigation,props)}
      onLongPress={()=>setmodalvisible(true)}
        style={[
          styles.container,
          { backgroundColor: props.index % 2 === 0 ? "white" : "grainboro" },
        ]}
      >
        <Image
          style={styles.imagestyle}
          resizeMode="contain"
          source={{ uri: props.image }}
        />
        <Text style={styles.item}>{props?.brand}</Text>
        <Text style={styles.item} numberOfLines={1} ellipsizeMode="tail">
          {props.name}
        </Text>
        <Text style={styles.item} numberOfLines={1} ellipsizeMode="tail">
          {props.category.name}
        </Text>
        <Text style={styles.item}>${props.price}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 3,
    width: width,
  },
  imagestyle: {
    borderRadius: 50,
    width: width / 6,
    height: 20,
    margin: 2,
  },
  item: {
    flexWrap: "wrap",
    margin: 3,
    width: width / 6,
  },
  centering:{
    justifyContent:'center',
    alignItems:'center',
    flex:1,
    marginTop:22
  },
  makingcard:{
    backgroundColor:'white',
    padding:40,
    borderRadius:25,
    alignItems:'center',
    shadowColor:'#000',
    shadowOffset:{width:0,height:2},
    shadowOpacity:0.25,
    shadowRadius:3.84,
    elevation:5
  }
});

export default ListItems;
