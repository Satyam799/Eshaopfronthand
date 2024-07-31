import { useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";
import Swiper from "react-native-swiper";
import Catigory from "./Ctigoryfilter";


const data = [
  "https://www.yardproduct.com/blog/wp-content/uploads/2016/01/gardening-banner.jpg",
  "https://pbs.twimg.com/media/D7P_yLdX4AAvJWO.jpg",
  "https://images.vexels.com/media/users/3/126443/preview2/ff9af1e1edfa2c4a46c43b0c2040ce52-macbook-pro-touch-bar-banner.jpg",
];

const { width } = Dimensions.get("window");

export default function Baneer() {
  const [banner, setbanner] = useState(data);
  return (
    <View style={styles.container}>
      <View style={styles.swiper}>
        <Swiper
          style={{ height: width / 2 }}
          autoplay={true}
          autoplayTimeout={2}
          autoplayDirection={true}
          showsButtons={false}
          >
          {banner.map((el) => {
           return  <Image
              style={styles.imagestyling}
              key={el}
            resizeMode='contain'
            source={{uri:el}}
            />;
          })}
        </Swiper>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gainsboro",
  },
  swiper: {
    width: width,
    alignItems: "center",
    marginTop: 10,
  },
  imagestyling: {
    borderRadius: 20,
    marginHorizontal: 20,
    width: width - 40,
    height: width / 2,
  },
});
