import React, {useState} from 'react';
// import { getToken } from '../../src/utils/auth';
import { Button, FormInput } from '../../components';
import { useAppSelector, useAppDispatch } from '../../app/store'
// import history from '../../utils/history';

// import history from '../routes/history';
import { Credentials } from './authSlice'
import { login } from './authSlice';
import env from 'react-dotenv'

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useAppDispatch();
    const {status} = useAppSelector((state) => state.auth);

    // if(token || getToken()){
        // history.push('/home');
    // }
    // console.log('nazdar')
    const handleLogin = (e: React.FormEvent) => {
        // console.log('api base: ' + env.API_BASE)
        e.preventDefault()
        const cred: Credentials = {email: email, password: password}
        // setTimeout(cus, 5000);
        dispatch(login(cred))
    }

    function cus () {
        console.log("nazdar")
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