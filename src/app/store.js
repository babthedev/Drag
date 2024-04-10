import { configureStore } from "@reduxjs/toolkit"
import homeReducer from "../features/homeSlice"
import authReducer from "../features/authSlice"
import dashReducer from "../features/dashSlice"
export const store = configureStore({
    reducer:{
        homepage: homeReducer,
        auth: authReducer,
        dashboard: dashReducer
    }
})
