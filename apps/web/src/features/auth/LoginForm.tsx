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
        
        history.push('/home')
    }

    return (
        <div className="loginForm">
            <form onSubmit={handleLogin}>
                <FormInput 
                    onChange={(e: React.FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)}
                    placeholder="E-mail" type="email" value={email}/>
                <FormInput
                    onChange={(e: React.FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)}
                    placeholder="Heslo" type="password" value={password}/>

                { status === 'loading' ? <div className="loading"><span>Přihlašování...</span></div>
                : 
                <Button type="submit" caption="Jdu!"/>}
            </form>
        </div>
    )
}

export default LoginForm;