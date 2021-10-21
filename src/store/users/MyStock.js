import { createSlice } from "@reduxjs/toolkit";


const MyStockSlice = createSlice({
    name: 'MyStock',
    initialState: [],
    reducers: {
        fetchMyStock: (state, action) => {
            return action.payload
        },
    }
})

const { actions, reducer } = MyStockSlice;

export const { fetchMyStock } = actions;

export default reducer;