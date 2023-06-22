import {createSlice} from '@reduxjs/toolkit';
import  lifeConfig from '../../config/life-game-config.json'
export function getSize() {
    return Math.min(window.innerHeight, window.innerWidth) / lifeConfig.dimension;
}
const initialState: {size:number} = {
    size:getSize()
}
const slice = createSlice({
    initialState,
    name: 'sizeState',
    reducers: {
        setSize: (state) => {
            state.size = getSize();
        }   
    }
})
export const sizeActions = slice.actions;
export const sizeReducer = slice.reducer;