// store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSclice";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
