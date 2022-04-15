import React from 'react';
import axios from 'axios'
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { Credentials, IAthlete } from 'puckee-common/types'

export const API_BASE = 'http://192.168.0.188:5000/api'

export function Layout() {
    return (
      <>
        <Outlet />
      </>
    )
  }
  
  interface AuthContextType {
    userData: any;
    signin: (credentials: Credentials, callback: (VoidFunction)) => Promise<void>;
    signout: (callback: VoidFunction) => void;
  }
  
  let AuthContext = React.createContext<AuthContextType>(null!);
  
  export function AuthProvider({ children }: { children: React.ReactNode }) {
    let [userData, setUserData] = React.useState<any>(null);
  
    let signin = (credentials: Credentials, callback: VoidFunction) => {
      return APIAuthProvider.signin(credentials, (data) => {
        setUserData(data);
        callback();
      });
    };
  
    let signout = (callback: VoidFunction) => {
      return APIAuthProvider.signout(() => {
        setUserData(null);
        callback();
      });
    };
  
    let value = { userData, signin, signout };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  }
  
  export const APIAuthProvider = {
    isAuthenticated: false,
    config: {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    },
    async signin(credentials: Credentials, callback: (userData : IAthlete) => void) {
        const response = await axios.post(`${API_BASE}/auth/login`, {email: credentials.email, password: credentials.password}, this.config)

        APIAuthProvider.isAuthenticated = true;
        callback(response.data)
    },
    
    signout(callback: VoidFunction) {
        APIAuthProvider.isAuthenticated = false;
        callback()
    },
  }
  
  export function useAuth() {
    return React.useContext(AuthContext);
  }
  
  export function RequireAuth({ children }: { children: JSX.Element }) {
    let auth = useAuth();
    let location = useLocation();
    if (!auth.userData) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    return children;
  }