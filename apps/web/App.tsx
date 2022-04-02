import React from 'react'
import { Router } from "react-router-dom";
import './index.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { store } from 'puckee-common/redux'
import { Provider } from 'react-redux'
// import { createBrowserHistory } from "history";

import history from './src/routes/history'
import Puckee from './Puckee';

// const history = createBrowserHistory()

function App () {
  return (
    <React.StrictMode>
      <Router history={history}>
        <Provider store={store}>
          <Puckee />
        </Provider>
      </Router>
    </React.StrictMode>
  )
}

export default App
