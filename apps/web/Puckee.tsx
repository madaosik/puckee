import React from 'react'
import { Dashboard, Games, Groups, Athletes, UserProfile } from './src/components'
import { NewGame } from './src/components/Games'
import { SignInForm, SignUpForm, SignUpDetailsForm } from './src/components/Auth'
import { AuthLayout, StdLayout, SearchLayout, DashboardLayout } from './src/pages/Layouts'
import { Route, Routes } from 'react-router-dom'
import { AuthProvider, RequireAuth } from 'puckee-common/auth'


function Puckee() {
  return (
      <div className="App">
        <AuthProvider>
          <Routes>
            <Route element={<AuthLayout />}>
              <Route path="sign-in" element={<SignInForm/>} />
              <Route path="sign-up" element={<SignUpForm/>} />
              <Route path="sign-up-details" element={<RequireAuth><SignUpDetailsForm/></RequireAuth>} />
              <Route path="*" element={<NoMatch />} />
            </Route>
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<RequireAuth><Dashboard/></RequireAuth>} />
              <Route path="dashboard" element={<RequireAuth><Dashboard/></RequireAuth>} />
            </Route>
            <Route element={<StdLayout />}>
              <Route path="profile" element={<RequireAuth><UserProfile/></RequireAuth>} />
              <Route path="groups" element={<RequireAuth><Groups/></RequireAuth>} />
              <Route path="games/new" element={<RequireAuth><NewGame/></RequireAuth>} />
              <Route path="games/:id" element={<RequireAuth><NewGame/></RequireAuth>} />

            </Route>
            <Route element={<SearchLayout />}>
              <Route path="games" element={<RequireAuth><Games/></RequireAuth>} />
              <Route path="athletes" element={<RequireAuth><Athletes/></RequireAuth>} />
            </Route>
          </Routes>
        </AuthProvider>
      </div>
  )
}

const NoMatch = () => {
  return <h1>Stránka nenalezena!</h1>;
}

export default Puckee