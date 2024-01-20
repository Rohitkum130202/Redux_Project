// store.js
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productSlice";
import cartReducer from "./cartSlice";
import userReducer from "./userSclice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    user: userReducer,
  },
});

export default store;
