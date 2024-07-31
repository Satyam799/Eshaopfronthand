import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import Productlist from "./Productlist";
import Header from "../../component/Header";
import Searchcomponent from "../../component/Seachcomponent";
import { View, StyleSheet, Platform, Text, ScrollView, ActivityIndicator } from "react-native";
import Baneer from "../../component/Swiper";
import Catigory from "../../component/Ctigoryfilter";
import { Uppost } from "../../Store/context";
import { useFocusEffect } from "@react-navigation/native";
import { fetchdata } from "../../utilities/Fetchingfunctions";
import { useSelector } from "react-redux";


function ProductContainer({ navigation }) {
  const Cart=useSelector(state=>state.Cart)

const {product,catigory,setProduct, setcatigory}=Uppost()
   const [branding, setbranding] = useState();
  const [search, setseach] = useState("");
  const [isfocused, setisfocused] = useState();
  const [active, setactive] = useState(false);
  const [mainproductaeer, setmainproductaeer] = useState();
  const [brandingdata,setbrandingdata]=useState(product)
  const [isloading,setisloading]=useState(true)


useFocusEffect(
  useCallback(()=>{
  async function fetchingg(){
    setisloading(true)
       const {m,Cm} =  await fetchdata()
        setProduct(m.data);
        setmainproductaeer(m.data)
        setbrandingdata(m.data)
        setcatigory(Cm.data.list)
        setisloading(false)

      }
      fetchingg()

    },[]))


  useLayoutEffect(
    function () {
    if (!active) return setmainproductaeer(brandingdata);
      const datafiltered = brandingdata.filter(
        (el) => el?.category.id === active?._id
      );
      setmainproductaeer(datafiltered);
    },
    [active]
  );
 
 
 
 
 
 
 
  navigation.setOptions({
    headerTitle: () => <Header />,
    headerTitleAlign: "center",
    headerSearchBarOptions: {
      placeholder: "Search....",
      onChangeText: (e) => {
        setseach(e.nativeEvent.text);
      },
      onCancelButtonPress: () => {
        setisfocused(false);
      },
    },
  });

  useEffect(
    function () {
      if (search.length >= 1) {
        setisfocused(true);
        const searchedreasult = brandingdata.filter((el) =>
          el.name.toLowerCase().trim().startsWith(search.toLowerCase().trim())
        ); // impline
        setbranding(searchedreasult);
      } else {
        setisfocused(false);
      }
    },
    [search]
  );

  const searchresut = branding?.map((el, i) => (
    <Searchcomponent list={el} key={Date.now() + i} />
  ));

  if(isloading) return <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
  <ActivityIndicator size={'large'} color={'red'}/>
  </View>

  if (isfocused)
    return (
      <View style={styles.smallcontainer}>
        {branding.length > 0 ? (
          searchresut
        ) : (
          <Text style={styles.teststyling}>
            No Product found with the searched creteria
          </Text>
        )}
      </View>
    );

return (
    <ScrollView>
      <View style={styles.container}>
        <Baneer />
        <ScrollView horizontal={true} bounces={true} style={styles.catigory}>
          {catigory?.map((el, i) => (
            <Catigory
              item={el}
              setactive={setactive}
              active={active}

              key={Date.now() + i}
            />
          ))}
        </ScrollView>
        <View style={styles.mapstyling}>
          {mainproductaeer?.map((item, i) => {
            return <Productlist item={item} key={Date.now() + i} />;
          })}
        </View>
        {/*<FlatList
          data={brandingdata}
          renderItem={(item) => (
            <Productlist item={item.item} key={item.item.name} />
          )}
          keyExtractor={(item) => item.name}
          numColumns={2}*
        />*/}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: Platform.select({ ios: 130, android: 0 }),
  },
  smallcontainer: {
    marginTop: Platform.select({ ios: 110, android: 10 }),
  },
  teststyling: {
    textAlign: "center",
    fontWeight: "bold",
  },
  catigory: {
    backgroundColor: "white",
    flex: 1.2,
    flexDirection: "row",
    marginTop: 2,
  },
  mapstyling: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
  },
});

export default ProductContainer;
