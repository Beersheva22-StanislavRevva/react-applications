import {createSlice} from '@reduxjs/toolkit';

const initialState: {fl:boolean} =  {
        fl:false
}
const slice = createSlice({
    initialState,
    name: 'userFlState',
    reducers: {
        setFl: (state, data) => {
            state.fl = data.payload as boolean;
        }
    }
})
export const userFlActions = slice.actions;
export const userFlReducer = slice.reducer;