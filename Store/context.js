import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { url } from "../utilities/Fetchingfunctions";

const Contextcreation = createContext();

const intailstate = {
  userId: "",
  isAuthenticated: false,
  userProfile: {},
};

function reducer(state, action) {
  switch(action.type){
    case "SetCurrentUser":{
    return {
        ...state,
        userId: action.payload, 
        isAuthenticated: true, 
      }
    };
    case "Set_use_Profile":{
      return {
        ...state, 
        userProfile: action.payload, 
      }
    }
    default:{
      return {
        ...state,
      };
    }
    }
}

function Contextprovider({ children }) {
  const [{ userId, isAuthenticated, userProfile },dispatch] = useReducer(reducer,intailstate);
  const [product, setProduct] = useState();
  const [catigory, setcatigory] = useState();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [errorss, seterrorss] = useState();

 /* async function Loggingusein(userdata) {
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
        dispatch({ type: "SetCurrentUser", payload: jwtDecode(decode).userid });
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
  }*/

  useEffect(function(){
    async function fetchdata(){
      const decode = await AsyncStorage.getItem("jwt");
      if(decode)
      dispatch({ type: "SetCurrentUser", payload: jwtDecode(decode).userid });
      console.log(userId)
    }
    fetchdata()
  },[])


  
  /*useEffect(function(){
    async function getFocusedRouteNameFromRoute() {
      const token =await AsyncStorage.getItem('jwt')
      const dataa = await fetch(`${url}/user/${userId}`,{
        method:'GET',
        headers:{
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      const res = await dataa.json();
      dispatch({type:"Set_use_Profile",payload:res.data})
    }
  
    getFocusedRouteNameFromRoute()
  },[userId])*/
  
 
 
  return (
    <Contextcreation.Provider
      value={{
        product,
        setProduct,
        catigory,
        setcatigory,
        email,
        setemail,
        password,
        setpassword,
        errorss,
        seterrorss,
        userId,
        isAuthenticated,
        userProfile,
      }}
    >
      {children}
    </Contextcreation.Provider>
  );
}

function Uppost() {
  const context = useContext(Contextcreation);
  return context;
}

export { Uppost, Contextprovider };
