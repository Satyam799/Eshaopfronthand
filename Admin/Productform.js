import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Dimensions,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Inputcomponent from "../Screens/Product/Form/Forminput";
import { url } from "../utilities/Fetchingfunctions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icons from "../component/Icons";
import { MaterialIcons } from "@expo/vector-icons";
import Easybutton from "../common/Styledcomponent/Easybutton";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import mime from 'mime'
import { CommonActions } from "@react-navigation/native";


const { width, height } = Dimensions.get("window");

function Productform({navigation,route}) {
  const [image, setimage] = useState();
  const [brand, setbrand] = useState();
  const [name, setname] = useState();
  const [price, setprice] = useState();
  const [stockincount, setstockincount] = useState();
  const [dsescription, setdsescription] = useState();
  const [Allcatigories, setAllcatigories] = useState();
  const [Category, setCategory] = useState();
  const [MainCategory, setMainCategory] = useState();
  const [Visible, setVisible] = useState(false);
  const [checked, setchecked] = useState(false);

  useEffect(function(){

    if(!route.params)return 
    console.log(route.params.items.image)
    setbrand(route.params.items.brand)
    setdsescription(route.params.items.brand)
    setname(route.params.items.name)
    setprice(route.params.items.price)
    setstockincount(route.params.items.countInStock.toString())
    setCategory(route.params.items.category.name)
    setimage(route.params.items.image)
  },[])









async function submitfunction() {


if (
      !brand ||
      !name ||
      !price ||
      !stockincount ||
      !dsescription ||
      !Category
    )
      return Alert.alert(
        "Form Incomplete",
        "Form is in complete please fill all the required details before submittiing the form"
      );



const formdata=new FormData()
const  newimage='file:///'+ image.split('file:/').join('')

formdata.append('name',name)
formdata.append('description',dsescription)
formdata.append('brand',brand)
formdata.append('price',price)
formdata.append('category',MainCategory)
formdata.append('countInStock',stockincount)
formdata.append('image',{

  uri:image,
  type:mime.getType(image),
  name:image.split('/').pop()
})
const tokendata=await AsyncStorage.getItem("jwt")
if(!tokendata)return 



const postingdata = await fetch(`${url}/product/${route.params ? route.params.items.id : '' }`, {
      method: `${route.params ? 'PUT' : 'POST' }`,
      headers: { 
      'Authorization': `Bearer ${tokendata}`,
      },
      body:formdata
    });
    const res= await postingdata.json()
    console.log(res)
    if(!res.data)return Toast.show({
      type:'error',
      topOffset:60,
      text1:'there is error on uploading somthing',
      text2:'please try again later'
    })
    if(res.data){Toast.show({
      type:'success',
      topOffset:60,
      text1:'Uploaded successfuly',
      text2:'Done',
      
    })
  navigation.navigate('Home')
  navigation.dispatch(
    CommonActions.reset({
      index:0,
      routes:[{name:'Product'}]
    })
  )
  }
    
}


  (async function () {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted")
      return Alert.alert("Please Provide the camera premission");
  })();

  async function pickimage() {
   const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setimage(result.assets[0].uri);
    }
  }

  useEffect(function () {
    async function datacatigory() {
      
      const data = await fetch(`${url}/category`);
      const res = await data.json();
      setAllcatigories(res.data.list);
    }
    datacatigory();
  }, []);

  function Handelcategory(el) {
    return (
      <View>
        <Text>{el.name}</Text>
      </View>
    );
  }

  return (
    <>
      <Modal animationType="slide" transparent={true} visible={Visible}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 250,
          }}
        >
          <View style={styles.stylecard}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-end",
                width: "95%",
                height: 20,
                top: -20,
              }}
            >
              <Icons name="close" size={24} onPress={() => setVisible(false)} />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                width: "100%",
              }}
            >
              {Allcatigories?.map((el) => (
                <TouchableOpacity
                  style={{
                    padding: 10,
                    width: "100%",
                    borderBottomWidth: 2,
                    borderColor: "#EBCDF2",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                  onPress={() => {
                    setCategory(el.name);
                    setMainCategory(el._id)
                    setchecked(!checked);
                    setTimeout(() => setVisible(false), 1000);
                  }}
                >
                  <Text>{el.name}</Text>

                  <MaterialIcons
                    name={
                      Category !== el.name
                        ? "radio-button-off"
                        : "radio-button-on"
                    }
                    size={24}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <Easybutton
              medium
              primary
              onPress={() => {
                setVisible(false);

                setCategory();
              }}
            >
              <Text>No Option</Text>
            </Easybutton>
          </View>
        </View>
      </Modal>

      <KeyboardAwareScrollView
        viewIsInsideTabBar={true}
        enableOnAndroid={true}
        extraHeight={200}
        contentContainerStyle={styles.stylingimage}
      >
        <View style={styles.Headerstyling}>
          <Text style={{ fontWeight: "semibold", fontSize: 40 }}>
            Add Product
          </Text>
        </View>
        <View style={styles.imagestylingperticularly}>
          <Image resizeMode='contain' style={styles.onlyimage} source={{ uri: image }} />
          <TouchableOpacity style={styles.ImagePicker}>
            <Icons
              name={"camera"}
              size={20}
              color={"white"}
              onPress={pickimage}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.lable}>
          <Text style={{ fontWeight: "bold", textDecorationLine: "underline" }}>
            Brand
          </Text>
        </View>
        <Inputcomponent
          placeholder={"Brand"}
          name={"brand"}
          value={brand}
          onChangeText={(e) => setbrand(e)}
        />
        <View style={styles.lable}>
          <Text style={{ fontWeight: "bold", textDecorationLine: "underline" }}>
            Name
          </Text>
        </View>
        <Inputcomponent
          placeholder={"Name"}
          name={"name"}
          value={name}
          onChangeText={(e) => setname(e)}
        />
        <View style={styles.lable}>
          <Text style={{ fontWeight: "bold", textDecorationLine: "underline" }}>
            Price
          </Text>
        </View>
        <Inputcomponent
          placeholder={"Price"}
          name={"price"}
          value={price}
          onChangeText={(e) => setprice(e)}
          keyboardType='numeric'
        />
        <View style={styles.lable}>
          <Text style={{ fontWeight: "bold", textDecorationLine: "underline" }}>
            CountInStock
          </Text>
        </View>
        <Inputcomponent
          placeholder={"CountInStock"}
          name={"stockincount"}
          value={stockincount}
          onChangeText={(e) => setstockincount(e)}
          keyboardType={"numeric"}
        />
        <View style={styles.lable}>
          <Text style={{ fontWeight: "bold", textDecorationLine: "underline" }}>
            Description
          </Text>
        </View>
        <Inputcomponent
          placeholder={"Description"}
          name={"description"}
          value={dsescription}
          onChangeText={(e) => setdsescription(e)}
        />
        <TouchableOpacity
          style={styles.stylingcatigories}
          onPress={() => setVisible(true)}
        >
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 20, color: "blue" }}>
              {Category ? Category : "Categories"}
            </Text>
          </View>
          <Icons name={"arrow-down"} size={30} color={"blue"} />
        </TouchableOpacity>
        <Easybutton primary large onPress={() => submitfunction()}>
          <Text>Submit Buttom</Text>
        </Easybutton>
      </KeyboardAwareScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  Headerstyling: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  stylingimage: {
    justifyContent: "center",
    alignItems: "center",
  },
  stylingsmallcontainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  lable: {
    width: "80%",
    marginTop: 10,
  },
  stylecard: {
    justifyContent: "center",
    alignItems: "center",
    height: height / 2,
    width: width / 2,
    backgroundColor: "#F1E3F4",
    borderWidth: 2,
    borderRadius: 20,
  },
  stylingcatigories: {
    width: "80%",
    borderWidth: 2,
    borderRadius: 20,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 32,
  },
  imagestylingperticularly: {
    width: 200,
    height: 200,
    borderRadius: 100,
    padding: 10,
    borderWidth: 8,
    borderStyle: "solid",
    borderColor: "#E0E0E0",
  },
  onlyimage: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  ImagePicker: {
    position: "absolute",
    right: 5,
    bottom: 5,
    backgroundColor: "grey",
    padding: 10,
    borderRadius: 100,
    elevation: 20,
  },
});

export default Productform;
