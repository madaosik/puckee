import React from 'react'
import { Dashboard, Games, Groups, Athletes, UserProfile } from './src/components'
import { GameDetail } from './src/components/Games'
import { GameAdminForm } from './src/components/Games/GameAdmin'
import { SignInForm, SignUpForm, SignUpDetailsForm } from './src/components/Auth'
import { AuthLayout, StdLayout, SearchLayout, DashboardLayout } from './src/pages/Layouts'
import { Route, Routes } from 'react-router-dom'
import { AuthProvider, RequireAuth } from 'puckee-common/auth'
import { NotificationsProvider } from 'puckee-common/context/NotificationsContext'
import Notifications from './src/components/Notifications'

function Puckee() {
  return (
      <div className="App">
        <NotificationsProvider>
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
                <Route path="games/new" element={<RequireAuth><GameAdminForm/></RequireAuth>} />
                <Route path="games/:id" element={<RequireAuth><GameDetail/></RequireAuth>} />
                <Route path="games/:id/edit" element={<RequireAuth><GameAdminForm/></RequireAuth>} />
              </Route>
              <Route element={<SearchLayout />}>
                <Route path="games" element={<RequireAuth><Games/></RequireAuth>} />
                <Route path="athletes" element={<RequireAuth><Athletes/></RequireAuth>} />
              </Route>
            </Routes>
          </AuthProvider>
          <Notifications />
        </NotificationsProvider>
      </div>
  )
}

const NoMatch = () => {
  return <h1>Stránka nenalezena!</h1>;
}

export default Puckee