import { useEffect, useState } from "react";
import {

  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Easybutton from "../common/Styledcomponent/Easybutton";
import Trafficlight from "../common/Styledcomponent/Traffuclight";
import { useDispatch } from "react-redux";
import { Addcart } from "../Store/Cartslice";


const {height}=Dimensions.get('window')
export default function Singleproduct({ route, navigation }) {

  const dispatch=useDispatch()
  console.log(route.params.items)
  const [component, setcomponent] = useState(route.params?.items);
  const [Availablility, setAvailablility] = useState(null);
  const [AvailablilityText, setAvailablilityText] = useState(null);

  useEffect(function () {
    setcomponent(route.params?.items)
    if (route.params.items.countInStock === 0) {
      setAvailablility(<Trafficlight unavilable></Trafficlight>);
      setAvailablilityText("Unavilable");
    }
    if (route.params.items.countInStock <= 5) {
      setAvailablility(<Trafficlight limited></Trafficlight>);
      setAvailablilityText("Limited");
    }
    if (route.params.items.countInStock > 5) {
      setAvailablility(<Trafficlight available></Trafficlight>);
      setAvailablilityText("Available");
    }
  }, [route.params?.items]);

  if (!component)
    return (
      <View>
        <Text>No component found</Text>
      </View>
    );
  return (
    <ScrollView>
      <View>
        <Image
          resizeMode="contain"
          style={styles.Imagestyle}
          source={{ uri: component.image }}
        />
      </View>
      <View style={styles.Stylingname}>
        <Text style={styles.namestyling}>{component.name}</Text>
        <Text style={styles.brandstyling}>{component.brand}</Text>
      </View>
      <View style={styles.Availitystyling}>
        <View style={styles.Availitystyl}>
          <Text> Availablility:{AvailablilityText} </Text>
          {Availablility}
        </View>
        <Text>{component.description}</Text>

      </View>
      <View style={styles.bottomRow}>
        <Text style={styles.Pricestylinh}>${component.price}</Text>
        <Easybutton
          medium
          primary
          onPress={() => dispatch(Addcart(component))}
        >
          <Text style={{ fontWeight: "bold", color: "white" }}> Add</Text>
        </Easybutton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Imagestyle: {
    width: "100%",
    height: 250,
    marginTop: 20,
  },
  Stylingname: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  namestyling: {
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 20,
  },
  bottomRow: {
    bottom:0,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: 'absolute',
    bottom:0-height/3.2
    },
  Pricestylinh: {
    fontSize: 20,
    fontWeight: "bold",
  },
  Availitystyling: {
    justifyContent: "center",
    alignItems: "center",
  },
  Availitystyl:{
    flexDirection:'row',
    padding:20
  },
  brandstyling:{
    fontWeight:'bold',
    fontSize:16
  }
});
