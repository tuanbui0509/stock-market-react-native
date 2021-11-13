import { createSlice } from "@reduxjs/toolkit";
const LightningTableSlice = createSlice({
    name: 'LightningTable',
    initialState: [],
    reducers: {
        fetchLightningTable: (state, action) => {
            return action.payload
        },
        FetchChangeListStocks: (state, action) => {
            let element = action.payload;
            let index = findIndex(state, element);
            state[index] = element;
        }
    }
})

const findIndex = (stocks, element) => {
    console.log(stocks);
    if (stocks) {
        for (let i = 0; i < stocks?.length; i++) {
            if (stocks[i]?.macp?.trim() === element?.macp?.trim()) { return i }
        }
    }
    return -1;
}


const { actions, reducer } = LightningTableSlice;

export const { fetchLightningTable, FetchChangeListStocks } = actions;

export default reducer;