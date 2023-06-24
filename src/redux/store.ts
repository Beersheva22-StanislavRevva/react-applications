import { configureStore } from "@reduxjs/toolkit";
import { admFlReducer } from "./Slices/admFlSlice";
import { userFlReducer } from "./Slices/userFlSlice"
import { useSelector } from "react-redux";

export const store = configureStore ({
    reducer: {
       admFlState: admFlReducer,
       userFlState: userFlReducer
    }
})

export function useSelectorAdmFl() {
    return useSelector<any,boolean>(state => state.admFlState.fl);
}

export function useSelectorUserFl() {
    return useSelector<any,boolean>(state => state.userFlState.fl);
}
