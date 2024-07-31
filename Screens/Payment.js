import { Pressable, StyleSheet, Text, View } from "react-native";
import DropdownComponent from "../component/Dropdowncomponent";
import { useState } from "react";
import Buttonwithstyle from "./Product/Bottomtabscreens/Buttonwithstyles";

function Payment({ navigation,route}) {
  const [Pyamentmethod, setpaymentmethod] = useState("");
  const methods = [
    { name: "Cash on delivery", value: 0 },
    { name: "Bank Transfer", value: 1 },
    { name: "Card Pyment", value: 2 },
  ];
  const paymentCards = [
    { name: "Wallet", value: 0 },
    { name: "Visa", value: 1 },
    { name: "MasterCards", value: 2 },
    { name: "Other", value: 3 },
  ];
const order=route.params?.order

function handelnavigation(){
  return navigation.navigate('Confirm',{order})
}


  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>Choose Your Payment Method</Text>
      </View>
      <View>
        {methods.map((el) => {
          return (
            <Pressable
              onPress={() => setpaymentmethod(el)}
              style={[
                styles.Insitedesign,
                el.name === Pyamentmethod.name
                  ? { backgroundColor: "red" }
                  : null,
              ]}
            >
              <Text>{el.name}</Text>
              <View style={styles.spacebar} />
              {el.name === "Card Pyment" ? (
                <DropdownComponent
                  element={el}
                  data={paymentCards}
                  setpaymentmethod={setpaymentmethod}
                />
              ) : null}
            </Pressable>
          );
        })}
      </View>
      <View style={styles.burttonj}>
      <Buttonwithstyle title={'Confirm'} pressed={handelnavigation}/>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,

    padding: 30,
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
  },
  Insitedesign: {
    backgroundColor: "white",
    marginBottom: 2,
    height: 40,
    paddingLeft: 10,
  },
  spacebar: {
    padding: 10,
  },
  burttonj: {
    justifyContent:'center',
    alignItems:'center',
    padding:100
  },
});

export default Payment;
