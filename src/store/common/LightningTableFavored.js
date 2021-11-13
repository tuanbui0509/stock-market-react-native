import { createSlice } from "@reduxjs/toolkit";


const LightningTableFavoredSlice = createSlice({
    name: 'LightningTableFavored',
    initialState: [],
    reducers: {
        fetchLightningTableFavored: (state, action) => {
            state = action.payload
            return [...state]
        },
        FetchChangeListStocks: (state, action) => {
            let element = action.payload;
            let index = findIndex(state, element);
            state[index] = element;
        }
    }
})

const findIndex = (stocks, element) => {
    for (let i = 0; i < stocks.length; i++) {
        if (stocks[i].macp.trim() === element.macp.trim()) { return i }
    }
    return -1;
}


const { actions, reducer } = LightningTableFavoredSlice;

export const { FetchChangeListStocks, fetchLightningTableFavored } = actions;

export default reducer;