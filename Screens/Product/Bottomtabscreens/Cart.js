import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Button,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Searchcomponent from "../../../component/Seachcomponent";
import Cartcomponent from "../../../component/Cartcomponent";
import { Clercart, Removecart } from "../../../Store/Cartslice";
import { SwipeListView } from "react-native-swipe-list-view";
import Icons from "../../../component/Icons";
import Easybutton from "../../../common/Styledcomponent/Easybutton";

const { height, width } = Dimensions.get("window");




function Cartbasket({ navigation }) {
  const cart = useSelector((state) => state.Cart.Cart);
  const Authorize=useSelector((state)=>state.Cart.isAuthenticated)


  const dispatch = useDispatch();
  console.log(cart);

  if (cart.length === 0)
    return (
      <View style={styles.containerStyling}>
        <Text style={styles.textStyling}>Looks like your cart is empty</Text>
        <Text style={styles.textStyling}>
          Add certain products to your cart to get started
        </Text>
      </View>
    );

  return (
    <>
      <SwipeListView
        data={cart}
        renderItem={(data) => <Cartcomponent list={data.item} key={data.id} />}
        renderHiddenItem={(data) => {
          return (
            <View style={styles.hiddenstyle}>
              <TouchableOpacity style={styles.to}>
                <Icons
                  name={"trash"}
                  size={30}
                  color={"white"}
                  onPress={() => dispatch(Removecart(data.item._id.$oid))}
                />
              </TouchableOpacity>
            </View>
          );
        }}
        disableRightSwipe={true}
        previewOpenDelay={3000}
        friction={1000}
        tension={40}
        leftOpenValue={75}
        stopLeftSwipe={75}
        rightOpenValue={-75}
      />
      <SafeAreaView>
        <View style={styles.bottomStyling}>
          <Text style={styles.totalPrice}>
            ${cart.reduce((acc, crr) => acc + Number(crr.price), 0).toFixed(2)}
          </Text>
          <View style={styles.buttonContainer}>
            <Easybutton
              dangerous
              medium
              onPress={() => {
                dispatch(Clercart());
              }}
            >
              <Text>Clear</Text>
            </Easybutton>
            <View style={styles.spacer} />
            { Authorize ?
              <Easybutton
                primary
                medium
                onPress={() => navigation.navigate("Checkout")}
              >
                <Text>Checkout</Text>
              </Easybutton> :<Easybutton
                secondry
                medium
                onPress={() => navigation.navigate("Profile")}
              >
                <Text>Login</Text>
              </Easybutton>
            }
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  containerStyling: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  textStyling: {
    fontWeight: "bold",
  },
  bottomStyling: {
    position: "absolute",
    bottom: 0,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  spacer: {
    width: 10,
  },
  hiddenstyle: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    width: width - 30,
    alignSelf: "center",
    backgroundColor: "#fff",
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    flex: 1,
    backgroundColor: "red",
  },
  to: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    padding: 10,
  },
});

export default Cartbasket;
