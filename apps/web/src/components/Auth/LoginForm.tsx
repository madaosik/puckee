import React, {useState} from 'react';
import { FormInput, Button } from '../FormElements'
// import { useAppSelector, useAppDispatch } from 'puckee-common/redux'
import history from '../../routes/history';
import { Credentials } from 'puckee-common/types'
// import { login } from 'puckee-common/features/auth/authSlice';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from 'puckee-common/auth'

export interface LocationState {
    from: {
      pathname: string;
    };
  }

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = useAuth()
    const navigate = useNavigate()
    let from = location.state?.from?.pathname || "/";
    // const dispatch = useAppDispatch();
    // const { status } = useAppSelector((state) => state.auth);
    // const previousState = useLocation<LocationState>().state

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        const cred: Credentials = {email: email, password: password}
        auth.signin(cred, () => {
            navigate(from, { replace: true })
        })
        // dispatch(login(cred))        
        //     .unwrap()
        //     .then(token => { 
        //         localStorage.setItem('access_token', token.access_token)
        //         if(!previousState)
        //         {
        //             history.push('/dashboard')
        //         } else if (previousState.from.pathname == '/' || previousState.from.pathname == '/sign-in') {
        //             history.push('/dashboard')
        //         } else {
        //             history.push(previousState.from.pathname)
        //         }
        //     })
        //     .catch((error) => console.log(error))
        }

    return (
        <div className="loginWrapper">
            <form onSubmit={handleLogin}>
                <h3 style={{ marginBottom: "1rem" }}>Jdeš do hry?</h3>
                <div className="form-group">
                    <label>E-mail</label>
                    <FormInput 
                        onChange={(e: React.FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)}
                        placeholder="E-mail" type="email" value={email}/>
                </div>
                <div className="form-group">
                    <label>Heslo</label>
                    <FormInput
                        onChange={(e: React.FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)}
                        placeholder="Heslo" type="password" value={password}/>
                </div>
                {/* <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Zapamatuj si mě</label>
                    </div>
                </div> */}
                { 
                    status === 'loading' ? <div className="loading"><span>Přihlašování...</span></div>
                        :
                    <Button className="btn btn-primary btn-lg" type="submit" caption="Jdu!"/>
                }

                {/* <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p> */}
            </form>
        </div>
        // }
    )
}

export default LoginForm