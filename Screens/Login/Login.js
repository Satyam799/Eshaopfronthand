import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Inputcomponent from "../Product/Form/Forminput";
import Error from "./Error";
import { Uppost } from "../../Store/context";
import {
  Loggingusein,
  getFocusedRouteNameFromRoute,
} from "../../utilities/Fetchingfunctions";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import Loader from "../../component/Loader";
import { Logedin } from "../../Store/Cartslice";
import Easybutton from "../../common/Styledcomponent/Easybutton";

function Login({ navigation }) {

  const dispatch = useDispatch();
  const { email, setemail, password, setpassword, errorss, seterrorss } =
    Uppost();

  const { userProfile } = useSelector((state) => state.Cart);
  
  const [loading, setlodaing] = useState(true);
  useEffect(function () {
    async function fetchdata() {
      try {
        const decode = await AsyncStorage.getItem("jwt");

        if (decode) {
          dispatch(Logedin(jwtDecode(decode).userid));
          await getFocusedRouteNameFromRoute(
            jwtDecode(decode).userid,
            dispatch
          );
        }
      } catch (err) {
        console.log(err);
      } finally {
        setlodaing(false);
      }
    }
    fetchdata();
  }, []);

  useEffect(
    function () {
      if(  typeof userProfile === 'object' && Object.keys(userProfile).length===0) return 
      
      navigation.navigate("User-Profile");

    },[userProfile]);

  async function handelSubmit() {
    const user = {
      email,
      password,
    };
    if (email === "" || password === "") {
      seterrorss("Please fill the credentials");
    } else {
      seterrorss("");
      await Loggingusein(user, dispatch);
    }
  }

  if (loading) return <Loader />;

  return (
    <View style={styles.container}>
      <Text style={styles.textstyle}>Login</Text>
      <Inputcomponent
        placeholder={"Login"}
        name={"Login"}
        value={email}
        onChangeText={(e) => setemail(e)}
      />
      <Inputcomponent
        placeholder={"Password"}
        name={"Password"}
        value={password}
        onChangeText={(e) => setpassword(e)}
      />
      <View>
        {errorss ? <Error message={errorss} /> : ""}
        <Easybutton primary medium  onPress={() => handelSubmit()}><Text style={{fontWeight:'bold',color:'white'}}>Login</Text></Easybutton>
      </View>
      <Text style={styles.Noaccount}>Don't have an Account Yet ?</Text>
      <Easybutton secondry medium   onPress={() => navigation.navigate("Registerscreen")}><Text style={{fontWeight:'bold',color:'white'}}>Register</Text></Easybutton>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  textstyle: {
    fontWeight: "bold",
    fontSize: 30,
    margin: 20,
  },
  Noaccount: {
    marginTop: 50,
    marginBottom: 20,
    fontSize: 15,
    fontWeight: "500",
  },
});

export default Login;
