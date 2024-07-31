import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CartComponent from "../component/Seachcomponent";
import Buttonwithstyle from "./Product/Bottomtabscreens/Buttonwithstyles";
import { Clercart } from "../Store/Cartslice";
import ConfirmComponent from "../component/Componentforfinalscreen";
import { url } from "../utilities/Fetchingfunctions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

const { width } = Dimensions.get("window");
function Confirmscreen({ navigation, route }) {
  const dispatch = useDispatch();
  const order = route.params?.order;
  console.log(order)
  const cart = useSelector((state) => state.Cart.Cart);
  const orderItems = cart.map((el,i) => {
    const obj={}
    const count=cart.filter((element)=>element.id===el.id).length
    const id =el.id
    obj['quantity']=count
    obj['product']=id
    return obj
})
console.log(order)
  async function handelplaceorder() {
    const id=await AsyncStorage.getItem("jwt")
    const userids =  jwtDecode(id).userid;


    const data = await fetch(`${url}/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${id}`,
      },
      body: JSON.stringify({
        orderItems: orderItems,
        user: userids,
        shippingAddress1: order?.ShippingAddress1,
        shippingAddress2: order?.ShippingAddress2,
        city: order?.City,
        zip: order?.Zipcode,
        country: order?.Country?.name,
        phone: order?.Phone,
        status:order.status,
        totalPrice: cart.reduce((acc, crr) => crr + acc.price, 0),
      }),
    });
    const res=await data.json()
    console.log(res)
    // dispatch(Clercart());
    // navigation.navigate("Cartbasket");
  }

  return (
    <ScrollView>
      <View style={styles.Headingstyle}>
        <Text style={styles.textstyling}>Confirm Your Order</Text>
      </View>
      <View style={styles.topstyling}>
        <View style={styles.cardstyling}>
          <Text style={styles.text}>Shipping to</Text>
          <View style={styles.datastyle}>
            <Text>{order?.City}</Text>
            <Text>{order?.Country?.name}</Text>
            <Text>{order?.Name}</Text>
            <Text>{order?.Phone}</Text>
            <Text>{order?.ShippingAddress1}</Text>
            <Text>{order?.ShippingAddress2}</Text>
            <Text>{order?.Zipcode}</Text>
            <Text>{order?.status}</Text>

          </View>
          <Text style={styles.text}>Items:</Text>
          {cart.map((el) => (
            <ConfirmComponent list={el} />
          ))}
        </View>
      </View>

      <View style={styles.button}>
        <Buttonwithstyle title="Place Order" pressed={handelplaceorder} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Headingstyle: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  textstyling: {
    fontWeight: "bold",
    fontSize: 23,
  },
  cardstyling: {
    borderWidth: 2,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: width - 100,
  },
  datastyle: {
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 10,
  },
  text: {
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  topstyling: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Confirmscreen;
