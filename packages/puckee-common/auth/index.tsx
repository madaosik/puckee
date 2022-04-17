import React from 'react';
import axios from 'axios'
import { Navigate, useLocation } from 'react-router-dom'
import { Credentials, IAthlete } from 'puckee-common/types'
import { API_BASE } from 'puckee-common/api'
  
interface AuthContextType {
  userData: any;
  signin: (credentials: Credentials, callback: ((status: number, data: any) => void)) => Promise<void>;
  signup: (credentials: Credentials, callback: ((status: number, data: any) => void)) => Promise<void>;
  signout: (callback: VoidFunction) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  let [userData, setUserData] = React.useState<any>(null);

  let signin = (credentials: Credentials, callback: (status: number, data : any) => void) => {
    return APIAuthProvider.authReq("login", credentials, (status, data) => {
      setUserData(data)
      callback(status, data);
    });
  };

  let signup = (credentials: Credentials, callback: (status: number, data : any) => void) => {
    return APIAuthProvider.authReq("signup", credentials, (status, data) => {
      setUserData(data)
      callback(status, data);
    });
  };

  let signout = (callback: VoidFunction) => {
    return APIAuthProvider.signout(() => {
      setUserData(null);
      callback();
    });
  };

  let value = { userData, signin, signup, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const APIAuthProvider = {
  isAuthenticated: false,
  config: {
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      },
      timeout: 200
  },
  async authReq(endpoint: string, credentials: Credentials, callback: (status: number, responseData : any) => void) {
      axios.post(`${API_BASE}/auth/${endpoint}`, {email: credentials.email, password: credentials.password}, this.config)
        .then( (response) => {
                  APIAuthProvider.isAuthenticated = true
                  callback(response.status, response.data)
                })
        // https://axios-http.com/docs/handling_errors
        .catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            callback(error.status, error.response.data)
          } else if (error.request) {
            // The request was made but no response was received
            callback(-1, {'message': 'Chyba připojení k síti!'})
            // console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
          // console.log(error.config);
        });
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
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return children;
}