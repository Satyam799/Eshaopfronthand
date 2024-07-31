import { Dimensions, Image, StyleSheet } from "react-native";

const {width}=Dimensions.get('window')

function Header() {
  return (
      <Image resizeMode='contain'
        style={styles.imagestyleing}
        source={require("../assets/image.png")}
      />
  );
}

const styles = StyleSheet.create({
  imagestyleing: {
    width: "100%",
    height: 40,
    marginBottom:10,
  },
});

export default Header;
