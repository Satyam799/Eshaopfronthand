import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { jwtDecode } from "jwt-decode";
import { Logedin, Profile } from "../Store/Cartslice";

export const url='http://192.168.1.7:3000/api/v1'


export async function fetchdata() {
  const data = await fetch(`${url}/product`);
  const m = await data.json();

  const Cdata = await fetch(`${url}/category`);
  const Cm = await Cdata.json();

  return { m, Cm };
}

export async function Registring(data, navigation) {
  let output;
  try {
    const call = await fetch(`${url}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.Name,
        email: data.email,
        password: data.password,
        phone: data.Phone,
        isAdmin: data.isAdmin,
      }),
    });
    output = await call.json();
    if (call.status === 200) {
      Toast.show({
        topOffset: 80,
        type: "success",
        text1: "Registration Completed",
        text2: "Please Login into your account",
      });
      setTimeout(() => navigation.navigate("LoginMainscreen"), 5000);
    }
  } catch (err) {
    Toast.show({
      topOffset: 50,
      type: "error",
      text1: "Somthing went Wrong",
      text2: "Please Try again later",
    });
  }
  console.log(output);
}


export async function Loggingusein(userdata,dispatch) {
  try {
    const data = await fetch(`${url}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userdata.email,
        password: userdata.password,
      }),
    });

    const res = await data.json();
    if (res.token) {
      const token = res.token;
      AsyncStorage.setItem("jwt", token);
      const decode = await AsyncStorage.getItem("jwt");
      dispatch(Logedin(jwtDecode(decode).userid));
      getFocusedRouteNameFromRoute(jwtDecode(decode).userid,dispatch)
    } else {
      console.log("error occured while logging u in");
    }
  } catch (err) {
    console.log(err);
    Toast.show({
      topOffset: 50,
      type: "error",
      text1: "Unable to Logged you in",
      text2: "Sorry unable to logged you in please try again later",
    });
  }
}


  export async function getFocusedRouteNameFromRoute(id,dispatch) {
    const token =await AsyncStorage.getItem('jwt')
    const dataa = await fetch(`${url}/user/${id}`,{
      method:'GET',
      headers:{
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    const res = await dataa.json();
    dispatch(Profile(res.data))
  }





export async function logoutuser() {
  AsyncStorage.clear("jwt");
}
