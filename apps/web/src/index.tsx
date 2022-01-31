import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from "react-router-dom";
import './index.css'
import App from './App'
import { store } from 'puckee-common/redux'
import { Provider } from 'react-redux'

import history from '../src/routes/history'

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
