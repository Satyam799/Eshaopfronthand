import { useEffect, useState } from "react";
import Trafficlight from "../common/Styledcomponent/Traffuclight";
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icons from "../component/Icons";
import { MaterialIcons } from "@expo/vector-icons";
import Easybutton from "../common/Styledcomponent/Easybutton";
import { url } from "../utilities/Fetchingfunctions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height,width } = Dimensions.get("screen");

export default function Orderitems(props) {
  const [orderstatus, setorderstatus] = useState();
  const [statustext, setstatustext] = useState();
  const [statuschange, setstatuschange] = useState();
  const [cardcolor, setcardcolour] = useState();
  const [visible,setvisible]=useState(false)

  async function updatestatus(){
    const token=await AsyncStorage.getItem('jwt')
    const data =await fetch(`${url}/order/${props.id}`,{
      method:'PATCH',
      headers:{
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body:JSON.stringify({
        status:statuschange
      })
    }) 

    const res=await data.json()
    console.log(res)
  }



  const statuses = [
    { status: 1, name: "delivered" },
    { status: 2, name: "shipped" },
    { status: 3, name: "Pending" },
  ];
  useEffect(function () {
    if (+props.status === 3) {
      setorderstatus(<Trafficlight unavailable></Trafficlight>);
      setstatustext("Pending");
      setcardcolour("#E74CEC");
    } else if (+props.status === 2) {
      setorderstatus(<Trafficlight limited></Trafficlight>);
      setstatustext("shipped");
      setcardcolour("#F1C40F");
    } else {
      setorderstatus(<Trafficlight limited></Trafficlight>);
      setstatustext("delivered");
      setcardcolour("#2ECC71");
    }
  }, []);
  return (
    <>
      <Modal visible={visible} transparent={true} animationType="slide">
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: height,
          }}
        >
          <View
            style={{
              backgroundColor: "#eae3dc",
              height: height - height / 2,
              width: width / 2,
              borderRadius: 10,
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-end",
                height: "5%",
              }}
            >
              <Icons name="close" size={24} onPress={()=>setvisible(false)} />
            </View>
            {statuses.map((el) => (
              <TouchableOpacity
                style={{
                  borderBottomWidth: 2,
                  borderBottomColor: "#EBCDF2",
                  flexDirection:'row',
                  justifyContent:'space-between',
                  height:'30%',
                  alignItems:'center',
                  padding:5
                }}
                onPress={()=>{
                  setstatustext(el.name)
                  setstatuschange(el.status)
                  
                  setTimeout(()=>{setvisible(false)
                  },1000)

                
                }
              }
              >
                <Text>{el.name}</Text>
                <MaterialIcons name={statustext===el.name ? "radio-button-on":"radio-button-off"} size={24}  />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
      <View style={[styles.innercontainer, { backgroundColor: cardcolor }]}>
        <View style={styles.innercontainer}>
          <Text>Order Number: #{props.id}</Text>
        </View>
        <View>
          <Text>
            Status:{statustext}
            {orderstatus}
          </Text>
          <Text>
            Address:{props.shippingAddress1} {props.shippingAddress2}
          </Text>
          <Text>City:{props.city}</Text>
          <Text>Country:{props.country}</Text>
          <Text>Date:{props.dateOrdered.split("T")[0]}</Text>
        </View>
        <View style={styles.pricetstyle}>
          <Text style={{ fontSize: 16, color: "red", fontWeight: "bold" }}>
            Price:
          </Text>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {" "}
            ${props.totalPrice}
          </Text>
        </View>
       { props?.panel==='order'? <>
       <TouchableOpacity style={{flexDirection:'row',alignItems:'center',marginLeft:6}} onPress={()=>setvisible(true)}>
          <Text style={{fontSize:'20',fontWeight:'bold'}}>{statustext}</Text>
          <View style={{width:30}}/>
          <Icons name={'arrow-down'} size={24} color={'red'}/>
        </TouchableOpacity>
        <Easybutton secondry large onPress={()=>{
          updatestatus()
         setTimeout(()=>props.navigation.navigate('Product'),2000) 
        }} ><Text>Update</Text></Easybutton>
        </>
        :''}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  outtercontainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  innercontainer: {
    padding: 30,
    margin: 10,
    borderRadius: 10,
  },
  pricetstyle: {
    width: "100%",
    alignItems: "flex-end",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
