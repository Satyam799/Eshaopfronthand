import { Dimensions, ScrollView, StyleSheet, Text } from "react-native";

const { width } = Dimensions.get("window");

export default function FormContainer({title,children} ) {
  return (
    <ScrollView contentContainerStyle={styles.Container}>
      <Text style={styles.textstyle}>{title}</Text>
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Container: {
    justifyContent: "center",
    alignItems: "center",
    width: width,
  },
  textstyle: {
    fontWeight: "bold",
    fontSize: 35,
  },
});
