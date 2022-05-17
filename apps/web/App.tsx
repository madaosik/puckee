import React from 'react'
import './index.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { store } from 'puckee-common/redux'
import { Provider } from 'react-redux'
import Puckee from './Puckee';

// const history = createBrowserHistory()
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'

export const queryClient = new QueryClient()

function App () {
  return (
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Puckee />
            {/* <ReactQueryDevtools initialIsOpen={true} /> */}
          </BrowserRouter>   
        </QueryClientProvider>
    </React.StrictMode>
  )
}

export default App
