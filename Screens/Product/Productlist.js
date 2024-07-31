import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import Productcart from "./productcart";

const { width } = Dimensions.get("window");

function Productlist({ item }) {
  return (
    <View>
      <Productcart {...item} />
    </View>
  );
}

export default Productlist;
