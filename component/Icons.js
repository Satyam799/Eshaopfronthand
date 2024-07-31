import { Pressable, StyleSheet } from "react-native";
import {FontAwesome} from "@expo/vector-icons";

export default function Icons({ name, size,onPress,color }) {
  return (
    <Pressable onPress={onPress}>
      <FontAwesome style={styles.logo} name={name} size={size} color={color}/>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  logo: {
    justifyContent: "center",
    alignItems:'center',
    flex:1
  }
});
