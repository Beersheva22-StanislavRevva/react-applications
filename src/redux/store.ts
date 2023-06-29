import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { authReducer } from "./Slices/authSlice";
import UserData from "../model/UserData";

export const store = configureStore({
    reducer: {
     authState: authReducer
    }
});
export function useSelectorAuth() {
    return useSelector<any, UserData>(state => state.authState.userData);
}

