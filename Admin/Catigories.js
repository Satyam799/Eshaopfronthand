import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { url } from "../utilities/Fetchingfunctions";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import Easybutton from "../common/Styledcomponent/Easybutton";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Catigories() {
  const [category, setcategory] = useState();
  const [newCategory, setnewCategory] = useState();
  useFocusEffect(
    useCallback(() => {
      async function fetchcategory() {
        const data = await fetch(`${url}/category`);
        const res = await data.json();

        setcategory(res.data.list);
      }
      fetchcategory();
    }, [])
  );

  async function Submitfunction() {
    const token=await AsyncStorage.getItem('jwt')
    const dataa = await fetch(`${url}/category`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({
        name: newCategory,
      }),
    });

    const res = await dataa.json();
    console.log(res.data.category)

    setcategory([...category,res.data.category])

  }
console.log(category)
async function deletehandel(item){
    const token =await AsyncStorage.getItem('jwt')

    const data=await fetch(`${url}/category/${item.id}`,{
        method:'DELETE',
        headers:{
            'Authorization':`Bearer ${token}`,
        }
    })

    setcategory([...category].filter((el)=>el.id!==item.id))

}
  function handelcategorylist(item) {
    return (
      <View
        style={{ justifyContent: "center", alignItems: "center", marginTop: 5 }}
      >
        <View style={styles.cotainer}>
          <Text>{item.name}</Text>
          <Easybutton medium dangerous  onPress={()=>deletehandel(item)}>
            <Text style={{ color: "white" }}>Delete</Text>
          </Easybutton>
        </View>
      </View>
    );
  }

  return (
    <>
      <View>
        <FlatList
          data={category}
          renderItem={({ item }) => handelcategorylist(item)}
          keyExtractor={(item) => item.name}
        />
      </View>
      <View style={styles.constiner2}>
        <Text> Add Category</Text>
        <TextInput
          style={{
            borderWidth: 2,
            width: "48%",
            padding: 5,
            margin: 5,
            borderColor: "#5cb85c",
          }}
          name='category'
          value={newCategory}
          onChangeText={(e)=>setnewCategory(e)}
        />
        <Easybutton medium primary onPress={Submitfunction}>
          <Text>Submit</Text>
        </Easybutton>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  cotainer: {
    width: "95%",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 5,
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  constiner2: {
    width: "100%",
    backgroundColor: "white",
    padding: 5,
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    height: 80,
  },
});

export default Catigories;
