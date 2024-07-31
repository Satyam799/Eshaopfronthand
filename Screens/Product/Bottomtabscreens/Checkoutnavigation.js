import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Checkoutcomponent from "../Checkoutcomponent";
import Payment from "../../Payment";
import Confirmscreen from "../../Confirmscreen";

const Tabview=createMaterialTopTabNavigator()

function Checkoutnavigation(){
    return (
       <Tabview.Navigator >
            <Tabview.Screen name="SHIPPING" component={Checkoutcomponent}/>
            <Tabview.Screen name="Payment" component={Payment}/>
            <Tabview.Screen name='Confirm' component={Confirmscreen}/>
       </Tabview.Navigator>
    )
}

export default Checkoutnavigation