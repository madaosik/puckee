import React from 'react'
// import {
//   BrowserRouter as Router,
// } from 'react-router-dom'

import { Navbar } from './app/Navbar'
import Routes from './routes'
// import { Login } from '../src/pages'

function App() {
  return (
    <div>
      <Navbar />
      <div className="App">
        {/* <Switch> */}
          <Routes/>
          {/* <Route exact path="/" render={() => ( <GamesList/> )} />
          <Redirect to="/" /> */}
        {/* </Switch> */}
      </div>
    </div>
  )
}

export default App
