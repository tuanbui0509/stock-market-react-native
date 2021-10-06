import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Navigation from './src/components/navigation'
import index from './src/store/index'

export default function App() {

  return (
    <Provider store={index.store} >
      <PersistGate loading={null} persistor={index.persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  )
}