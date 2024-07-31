import { StyleSheet, Text, View } from "react-native";
import Gridtiles from "../../component/Gridtile";

function Productcart(props) {
  return (
    <View style={styles.container}>
      <Gridtiles {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Productcart;
