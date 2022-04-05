import React, {useState, Component, useEffect, useRef, MouseEventHandler} from 'react';
// import { getToken } from '../../src/utils/auth';
import { Button, FormInput } from '..';
import { useAppDispatch, useAppSelector } from 'puckee-common/redux'
// import history from '../../utils/history';

import history from '../../routes/history';
import { unwrapResult } from '@reduxjs/toolkit'
import { Link } from 'react-router-dom';
import { signUp } from 'puckee-common/features/auth/authSlice';
import { Credentials } from 'puckee-common/types';

export default function SignUpForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useAppDispatch();
    const { status } = useAppSelector((state) => state.auth);

    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault()
        const cred: Credentials = {email: email, password: password}
        dispatch(signUp(cred))
            .unwrap()
            .then(token => { 
                localStorage.setItem('access_token', token.access_token)
                history.push('/sign-up-details')
            })
            .catch((error) => console.log(error))
    }

    return (
        <div className='signup-login-wrapper'>
                <div className="signUp-title">Registrace nového hráče</div>
                <div className="signUp-loginInfo-content">
                    <div className="content-inner-box">
                        <div className="content-inner-row data signUp-accessData">
                            <form onSubmit={handleSignUp}>  
                                <div className="form-group">
                                    <label className="form-label">E-mail</label>
                                    <FormInput 
                                        onChange={(e: React.FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)}
                                        placeholder="E-mail" type="email" value={email}/>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Heslo</label>
                                    <FormInput
                                        onChange={(e: React.FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)}
                                        placeholder="Heslo" type="password" value={password}/>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Potvrzení hesla</label>
                                    <FormInput
                                        onChange={(e: React.FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)}
                                        placeholder="Heslo" type="password" value={password}/>
                                </div>
                                <Button className="btn btn-primary" type="submit" caption="Pokračovat"/>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='signUp-login-btnSection'>
                        <div className='signUp-regBtn'>
                            {/* <Link to={"\sign-up-details"}> */}
                                {/* <Button className="btn btn-primary" type="submit" caption="Pokračovat"/> */}
                            {/* </Link> */}
                        </div>
                    </div>
                </div>
    )
}