import { createSlice } from '@reduxjs/toolkit'

// Slice
const isTokenSlice = createSlice({
    name: 'Token',
    initialState: false,
    reducers: {
        addToken: (state, payload) => {
            return true
        },
        removeToken: (state, payload) => {
            return false
        }
    },
});

const { actions, reducer } = isTokenSlice;

export const { addToken, removeToken } = actions;

export default reducer;