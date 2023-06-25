import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { authReducer } from "./Slices/authSlice";

export const store = configureStore({
    reducer: {
     authState: authReducer
    }
});
export function useSelectorAuth() {
    return useSelector<any, string>(state => state.authState.username);
}

