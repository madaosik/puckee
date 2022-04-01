import React, {useState} from 'react';
// import { getToken } from '../../src/utils/auth';
import { Button, FormInput } from '../../components';
import { useAppSelector, useAppDispatch } from 'puckee-common/redux'
import history from '../../routes/history';

// import history from '../routes/history';
import { Credentials } from 'puckee-common/types'
import { login } from 'puckee-common/features/auth/authSlice';
import { unwrapResult } from '@reduxjs/toolkit'

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useAppDispatch();
    const { status } = useAppSelector((state) => state.auth);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        const cred: Credentials = {email: email, password: password}
        dispatch(login(cred))
            .then(unwrapResult)
            .then(token => { localStorage.setItem('access_token', token.access_token) })
        
        history.push('/dashboard')
    }

    return (
        // <div className="loginForm">
        //     <form onSubmit={handleLogin}>
        //         <FormInput 
        //             onChange={(e: React.FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)}
        //             placeholder="E-mail" type="email" value={email}/>
        //         <FormInput
        //             onChange={(e: React.FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)}
        //             placeholder="Heslo" type="password" value={password}/>

        //         { status === 'loading' ? <div className="loading"><span>Přihlašování...</span></div>
        //         : 
        //         <Button type="submit" caption="Jdu!"/>}
        //     </form>
        // </div>
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
    )
}

export default LoginForm;