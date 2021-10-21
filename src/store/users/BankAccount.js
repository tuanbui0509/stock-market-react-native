import { createSlice } from "@reduxjs/toolkit";


const BankAccountSlice = createSlice({
    name: 'BankAccount',
    initialState: [],
    reducers: {
        fetchBankAccount: (state, action) => {
            return action.payload
        },
    }
})

const { actions, reducer } = BankAccountSlice;

export const { fetchBankAccount } = actions;

export default reducer;