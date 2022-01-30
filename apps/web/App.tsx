import React from 'react'
// import ReactDOM from 'react-dom'
import { Router } from "react-router-dom";
import './index.css'
// import App from './App'
import store from './src/app/store'
import { Provider } from 'react-redux'

import history from './src/routes/history'
import Puckee from './Puckee';

function App () {
  return (
    <React.StrictMode>
      <Router history={history}>
        <Provider store={store}>
          <Puckee />
        </Provider>
      </Router>
    </React.StrictMode>
    // ReactDOM.render(
    //   <React.StrictMode>
    //     <Router history={history}>
    //       <Provider store={store}>
    //         <Puckee />
    //       </Provider>
    //     </Router>
    //   </React.StrictMode>,
    //   document.getElementById('root')
    // )
  )
}

export default App

// ReactDOM.render(
//   <React.StrictMode>
//     <Router history={history}>
//       <Provider store={store}>
//         <App />
//       </Provider>
//     </Router>
//   </React.StrictMode>,
//   document.getElementById('root')
// )
