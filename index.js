// import { registerRootComponent } from 'expo';
// import App from './App';
// registerRootComponent(App);

// import React from 'react'
// import { Provider } from 'react-redux'
// import { PersistGate } from 'redux-persist/integration/react'
// import App from './App'
// import index from './src/store/index'
// export default function App() {

//   return (
//     <Provider store={index.store} >
//       <PersistGate loading={null} persistor={index.persistor}>
//         <App />
//       </PersistGate>
//     </Provider>
//   )
// }

import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class index extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}
