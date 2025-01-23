import { configureStore } from "@reduxjs/toolkit";
import cartItem from './cart'

export default configureStore({
    reducer:{
        cartItemAll : cartItem
    }
})