import { createSlice } from "@reduxjs/toolkit";


const isAdminSlice = createSlice({
    name: 'isAdmin',
    initialState: false,
    reducers: {
        isAdmin: (state, payload) => {
            console.log('isAdmin');
            return true
        },
        isUser: (state, payload) => {
            return false
        }
    }
})

const { actions, reducer } = isAdminSlice;

export const { isAdmin, isUser } = actions;

export default reducer;