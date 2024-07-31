import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Inputcomponent from "../Product/Form/Forminput";
import Error from "./Error";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Registring } from "../../utilities/Fetchingfunctions";
import Easybutton from "../../common/Styledcomponent/Easybutton";

function Register({navigation}) {
  const [email, setemail] = useState("");
  const [Name, setName] = useState("");
  const [Phone, setPhone] = useState("");
  const [password, setpassword] = useState("");

  const [errorss, seterrorss] = useState();
  async function  handelSubmit(){
    const Registeruser = {
      email,
      password,
      Phone,
      Name,
      isAdmin:false
    }
    if (email === "" || password === "" || Name === "" || Phone === "") {
      console.log('err')
      seterrorss("Please fill the credentials");
    } else {
      seterrorss("");
      const output = await Registring(Registeruser,navigation)
      
    }
  }
  return (<KeyboardAwareScrollView
  viewIsInsideTabBar={true}
  extraHeight={true}
  enableOnAndroid={true}
  >
    <View style={styles.container}>
      <Text style={styles.textstyle}>Register</Text>
      <Inputcomponent
        placeholder={"Email"}
        name={"Email"}
        value={email}
        onChangeText={(e) => setemail(e)}
      />
      <Inputcomponent
        placeholder={"Name"}
        name={"Name"}
        value={Name}
        onChangeText={(e) => setName(e)}
      />
      <Inputcomponent
        placeholder={"Phone Number"}
        name={"Phone"}
        value={Phone}
        onChangeText={(e) => setPhone(e)}
      />
      <Inputcomponent
        placeholder={"Password"}
        name={"Password"}
        value={password}
        onChangeText={(e) => setpassword(e)}
      />
      <View style={styles.button}>
        {errorss ? <Error message={errorss}/> : ""}
        <Easybutton primary medium onPress={() => handelSubmit()}  ><Text style={{fontWeight:'bold',color:'white'}}>Register</Text></Easybutton>
      </View>
      <View style={styles.button}>
      <Easybutton secondry large onPress={() => navigation.navigate("LoginMainscreen")}
      ><Text style={{fontWeight:'bold',color:'white'}}>Back To Login</Text></Easybutton>
   
      </View>
    </View>
    </KeyboardAwareScrollView>
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
  button: { 
    marginTop:20
  },
});
export default Register;
