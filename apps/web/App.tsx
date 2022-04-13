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
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClient, QueryClientProvider } from 'react-query'

export const queryClient = new QueryClient()

function App () {
  return (
    <React.StrictMode>
      <Router history={history}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <Puckee />
            <ReactQueryDevtools initialIsOpen={true} />
          </QueryClientProvider>
        </Provider>
      </Router>
    </React.StrictMode>
  )
}

export default App
