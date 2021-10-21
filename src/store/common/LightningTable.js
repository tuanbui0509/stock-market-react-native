import { createSlice } from "@reduxjs/toolkit";


const LightningTableSlice = createSlice({
    name: 'LightningTable',
    initialState: [],
    reducers: {
        fetchLightningTable: (state, action) => {
            return action.payload
        },
    }
})

const { actions, reducer } = LightningTableSlice;

export const { fetchLightningTable } = actions;

export default reducer;