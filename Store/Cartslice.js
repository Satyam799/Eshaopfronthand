import AsyncStorage from "@react-native-async-storage/async-storage"
import { createSlice } from "@reduxjs/toolkit"



const initialState={
 Cart:[],
 userId:'',
 isAuthenticated:false,
 userProfile:{}
}

const Cartslice=createSlice({
    name:'Cart',
    initialState,
    reducers:{
        Addcart(state,action){
           
           state.Cart=[...state.Cart,action.payload]
           return state
        },
        Removecart(state,action){
            state.Cart=state.Cart.filter((el)=>el._id.$oid!==action.payload)
            return state
        },
        Clercart(state){
            state.Cart=[]
        },
        Product(state,action){
            state.product=action.payload
        },
        Logedin(state,action){
            state.userId=action.payload
            state.isAuthenticated=true
        },
        Profile(state,action){
            state.userProfile=action.payload
        },
        Logout(state,action){
          return  initialState       
         }
    }
})




export  const {Addcart,Removecart,Clercart,Logedin,Profile,Logout}=Cartslice.actions

export function Loginguserout(){

    return async function(dispatch){

        await AsyncStorage.clear()
        dispatch({type:'Cart/Logout'})
    }

}




export default Cartslice.reducer


