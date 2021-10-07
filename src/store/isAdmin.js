import { createSlice } from "@reduxjs/toolkit";


const isAdminSlice = createSlice({
    name: 'isAdmin',
    initialState: false,
    reducers: {
        isAdmin: (state, payload) => {
            console.log('isAdmin');
            return true
        },
        removeAdmin: (state, payload) => {
            return false
        }
    }
})

const { actions, reducer } = isAdminSlice;

export const { isAdmin, removeAdmin } = actions;

export default reducer;