import {createSlice} from '@reduxjs/toolkit';

const initialState: {fl:boolean} =  {
        fl:false
}
const slice = createSlice({
    initialState,
    name: 'admFlState',
    reducers: {
        setFl: (state, data) => {
            state.fl = data.payload as boolean;
        }
    }
})
export const admFlActions = slice.actions;
export const admFlReducer = slice.reducer;