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

const eMailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

interface ErrorMsgProps {
    msg?: string
}

export const ErrorReport = ({msg} : ErrorMsgProps) => {
    return (
        <div className="formInputError">{msg}</div>
    )
}


export default function SignUpForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeated, setPasswordRepeated] = useState("");
    const [errors, setErrors] = useState({email: <ErrorReport/>, password: <ErrorReport/>, passwordRepeated: <ErrorReport/>})
    // const [emailError, setEmailError] = useState(<ErrorReport/>)
    // const [passwordError, setPasswordError] = useState(<ErrorReport/>)
    // const [passwordRepeatedError, setPasswordRepeatedError] = useState(<ErrorReport/>)
    const dispatch = useAppDispatch();
    const { status } = useAppSelector((state) => state.auth);
    var errorReport : React.ReactNode

    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault()
        var errorsToShow = {email: <ErrorReport/>,  password: <ErrorReport/>, passwordRepeated: <ErrorReport/>}
        var rerenderFlag : boolean = false

        if (!eMailRegex.test(email)) {
            errorsToShow.email = <ErrorReport msg="Neočekávaný formát e-mailové adresy!"/>
            rerenderFlag = true
        } else if (email==="") {
            errorsToShow.email = <ErrorReport msg="Zadej e-mailovou adresu!"/>
        } else {
            errorsToShow.email = <ErrorReport/>
        }
        
        if (password === "") {
            errorsToShow.password = <ErrorReport msg="Zadej heslo!"/>
            rerenderFlag = true
        } else {
            errorsToShow.password = <ErrorReport/>
        }
        
        
        if (password != passwordRepeated) {
            errorsToShow.passwordRepeated = <ErrorReport msg="Uvedená hesla se neshodují!"/>
            rerenderFlag = true
        } else {
            errorsToShow.passwordRepeated = <ErrorReport/>
        }
        
        if(rerenderFlag) {
            setErrors(errorsToShow)
            return
        }
            
        // if rerenderFlag
        const cred: Credentials = {email: email, password: password}
        dispatch(signUp(cred))
            .unwrap()
            .then(token => { 
                localStorage.setItem('access_token', token.access_token)
                history.push('/sign-up-details')
            })
            .catch((error) => {
                console.log(error)
                // setEmailError(<ErrorReport msg={error.message}/>)
            })
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
                                    {errors.email}
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Heslo</label>
                                    <FormInput
                                        onChange={(e: React.FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)}
                                        placeholder="Heslo" type="password" value={password}/>
                                    {errors.password}
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Potvrzení hesla</label>
                                    <FormInput
                                        onChange={(e: React.FormEvent<HTMLInputElement>) => setPasswordRepeated(e.currentTarget.value)}
                                        placeholder="Heslo" type="password" value={passwordRepeated}/>
                                    {errors.passwordRepeated}
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