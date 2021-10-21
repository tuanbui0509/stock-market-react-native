import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import Token from './Token';
import isAdmin from './isAdmin';
import CurrentUser from './CurrentUser';
import BankAccount from './users/BankAccount';
import MyStock from './users/MyStock';
import LightningTable from './common/LightningTable';
import {
    persistStore, persistReducer, FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
import AsyncStorage from '@react-native-async-storage/async-storage';
const reducer = combineReducers({
    Token,
    isAdmin,
    CurrentUser,
    BankAccount,
    LightningTable,
    MyStock
})

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['isAdmin', 'token', 'currentUser'] //
}

const persistedReducer = persistReducer(persistConfig, reducer)
let store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})
let persistor = persistStore(store)

export default {
    store,
    persistor
}