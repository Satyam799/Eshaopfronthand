import { LogBox, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icons from "./component/Icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductContainer from "./Screens/Product/Productcntainer";
import Singleproduct from "./component/Singleproduct";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./Store/store";
import Header from "./component/Header";
import Cartbasket from "./Screens/Product/Bottomtabscreens/Cart";
import Carticons from "./component/carticons";
import Checkoutnavigation from "./Screens/Product/Bottomtabscreens/Checkoutnavigation";
import { Contextprovider, Uppost } from "./Store/context";
import { useEffect, useState } from "react";
import {fetchdata} from './utilities/Fetchingfunctions'
import Loader from "./component/Loader";
import Login from "./Screens/Login/Login";
import Register from "./Screens/Login/Register";
import UserProfile from "./Screens/Login/UserProfile";
import Toast from "react-native-toast-message";
import Products from "./Admin/Product";
import Catigories from "./Admin/Catigories";
import Orders from "./Admin/Order";
import Productform from "./Admin/Productform";

LogBox.ignoreAllLogs(true);


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Homescreen() {
  return (
    <Stack.Navigator initialRouteName="Mainscreen">
      <Stack.Screen name="Mainscreen" component={ProductContainer} />
      <Stack.Screen
        name="singleproduct"
        component={Singleproduct}
        options={{
          headerTitle:()=><Header/>,
          headerTitleAlign:'center'
        }}
      />
    </Stack.Navigator>
  );
}

export function Handelscreen( navigation,item){
  
  const realitem={
    image:item.image,
    name:item.name,
    brand:item.brand,
    price:item.price
  }
  console.log(realitem.name)
 return navigation.navigate('Home',{screen:'singleproduct', params: {items:realitem}})
}


function Cartscreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Cartbasket"
        component={Cartbasket}
        options={{
          headerTitle: () => <Header />,
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen name='Checkout' component={Checkoutnavigation} options={{
          headerTitle: () => <Header />,
          headerTitleAlign: "center",

      }} />
    </Stack.Navigator>
  );
}

function Loginnavigation(){
  return <Stack.Navigator screenOptions={{
    headerTitle:()=><Header/>,
    headerTitleAlign:'center'
  }}>
    <Stack.Screen name="LoginMainscreen" component={Login}/>
    <Stack.Screen name="Registerscreen" component={Register}/>
    <Stack.Screen name="User-Profile" component={UserProfile}/>
  </Stack.Navigator>
}

function Adminnavigation(){
  return <Stack.Navigator screenOptions={{
    headerTitle:()=><Header/>,
    headerTitleAlign:'center'
}}>
    <Stack.Screen name="Product" component={Products}/>
    <Stack.Screen name="Catigories" component={Catigories}/>
    <Stack.Screen name="Orders" component={Orders}/>
    <Stack.Screen name="Productform" component={Productform}/>
    <Stack.Screen name='Homescreen' component={Homescreen} options={{
      headerShown:false
    }}/>
  </Stack.Navigator>
} 






function Root(){
  const [islodaing, setisloading] = useState(true);
  const { setProduct, setcatigory } = Uppost();
  const {userProfile}=useSelector((state)=>state.Cart)
  


  useEffect(function(){
      async function fetchingg(){
        try{
           const {m,Cm} =  await fetchdata()
           setProduct(m?.data);
           setcatigory(Cm?.data?.list)
          }catch(err){
            console.log(err)
          }finally{
           setisloading(false)
          }
          }
          fetchingg()

  },[])
 



if(islodaing) return <Loader/>

  return <Tab.Navigator
    initialRouteName="Profile"
    screenOptions={{ headerShown: false }}
  >
    <Tab.Screen
      name="Home"
      component={Homescreen}
      options={({ navigation }) => ({
        tabBarIcon: () => (
          <Icons
            name={"home"}
            size={24}
            onPress={() => navigation.navigate("Home")}
          />
        ),
      })}
    />
    <Tab.Screen
      name="Cart"
      component={Cartscreen}
      options={({ navigation }) => ({
        tabBarIcon: () => (
          <View style={styles.container}>
            <Icons
              name={"shopping-cart"}
              size={24}
              onPress={() => navigation.navigate("Cart")}
            />
            <View style={styles.space}/>
            <View style={styles.margining}>
            <Carticons/>
            </View>
          </View>
        ),

      })
    }
    />
    {userProfile?.isAdmin ? <Tab.Screen
      name="Setting"
      component={Adminnavigation}
      options={({ navigation }) => ({
        tabBarIcon: () => (
          <Icons
            name={"gear"}
            size={24}
            onPress={() => navigation.navigate("Setting")}
          />
        ),
      })}
    />:null}
    <Tab.Screen
      name="Profile"
      component={Loginnavigation}
      options={({ navigation }) => ({
        tabBarIcon: () => (
          <Icons
            name={"user"}
            size={24}
            onPress={() => navigation.navigate("Profile")}
          />
        ),
      })}
    />
  </Tab.Navigator>
}



export default function App() {
return (
      <NavigationContainer>
        <Contextprovider>
        <Provider store={store}>
          <Root/>
          <Toast ref={(ref) => Toast.setRef(ref)} />
          </Provider>

        </Contextprovider>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({

  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom:10,
    flex:1,
  },
  space:{
    width:2
  },
  margining:{
    marginBottom:8
  }
});
