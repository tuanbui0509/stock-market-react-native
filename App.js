import React from 'react'
import { LogBox } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Navigation from './src/components/navigation'
import index from './src/store/index'
import FlashMessage from "react-native-flash-message";
export default function App() {
  LogBox.ignoreLogs(['Remote debugger']);
  LogBox.ignoreLogs(['Reanimated 2']);
  LogBox.ignoreLogs(['Warning:'])
  return (
    <Provider store={index.store} >
      <PersistGate loading={null} persistor={index.persistor}>
        <Navigation />
        <FlashMessage position="top" />
      </PersistGate>
    </Provider>
  )
}