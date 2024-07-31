import { configureStore } from "@reduxjs/toolkit";
import Cartslice from "./Cartslice";


export const store=configureStore({
    reducer:{
        Cart:Cartslice
    }
})