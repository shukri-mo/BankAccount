import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./Slice"
const   Store=configureStore({
reducer:{
    account:accountReducer
}
})
export default Store;