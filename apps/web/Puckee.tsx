import axios from 'axios'
import { API_BASE } from 'puckee-common/api'

import React, { useState } from 'react'
import { MdEmail } from 'react-icons/md'
import { useQuery } from 'react-query'
import { Navbar } from './src/app/Navbar'
import { Dashboard, Games, Groups, NewGame, Players, UserProfile } from './src/components'
import LoginForm from './src/components/Auth/LoginForm'
import { Auth, Main } from './src/pages'
// import { Login } from '../src/pages'
import { Route, Routes } from 'react-router-dom'
import { AuthProvider, Layout, RequireAuth } from 'puckee-common/auth'
import { TopBarType } from './src/pages/Main'
import SignUpDetailsForm from './src/components/Auth/SignUpDetailsForm'

function Puckee() {
  const [headerContent, setHeaderContent] = useState<JSX.Element>(<></>)

  const newGameHeaderCb = (element: JSX.Element) => {
      setHeaderContent(element)
  }
  return (
      <div className="App">
        <AuthProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" 
                  element={<RequireAuth><Main content={<Dashboard/>} topBarType={TopBarType.Standard} /></RequireAuth>}
              />
              <Route path="/login"
                  element={<Auth content={<LoginForm/>}/>}
              />
              <Route path="/dashboard"
                  element={<RequireAuth><Main content={<Dashboard/>} topBarType={TopBarType.Standard} /></RequireAuth>}
              />
              <Route path="/sign-up-details"
                  element={<RequireAuth><SignUpDetailsForm/></RequireAuth>}
              />
              <Route path="/games"
                  element={<RequireAuth><Main content={<Games/>} topBarType={TopBarType.Search} /></RequireAuth>}
              />            
              <Route path="/games/new"
                    element={<RequireAuth><Main content={<NewGame gameTitleCb={newGameHeaderCb}/>} topBarType={TopBarType.Standard}/></RequireAuth>}
              />
              <Route path="/players"
                    element={<RequireAuth><Main content={<Players/>} topBarType={TopBarType.Search}/></RequireAuth>}
              />
              <Route path="/profile"
                    element={<RequireAuth><Main content={<UserProfile/>} topBarType={TopBarType.Standard}/></RequireAuth>}
              />
              <Route path="/groups"
                    element={<RequireAuth><Main content={<Groups/>} topBarType={TopBarType.Standard}/></RequireAuth>}
              />
            </Route>
          </Routes>
        </AuthProvider>
      </div>
  )
}

export default Puckee