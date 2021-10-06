import { createSlice } from "@reduxjs/toolkit";


const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState: {},
    reducers: {
        addUser: (state, action) => {
            return { ...action.payload };
        },
        removeUser: (state, action) => {
            return {}
        }
    }
})

const { actions, reducer } = currentUserSlice;

export const { addUser, removeUser } = actions;

export default reducer;