import React, {useState} from 'react';
import { Button, ErrorReport, FormInput } from '../FormElements';
import { Credentials } from 'puckee-common/types';
import { useAuth } from 'puckee-common/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { SignInFormError } from './SignInForm';

const eMailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

class SignUpFormError extends SignInFormError {
    passwordRepeated: React.ReactNode
    constructor() {
        super()
        this.passwordRepeated = <ErrorReport/>
    }
}

export default function SignUpForm() {
    const auth = useAuth()
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeated, setPasswordRepeated] = useState("");
    const [errors, setErrors] = useState(new SignUpFormError())
    const location = useLocation()

    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault()
        var errorsToShow = new SignUpFormError();
        var rerenderFlag : boolean = false

         if (email==="") {
            errorsToShow.email = <ErrorReport msg="Bez registračního e-mailu to nepůjde!"/>
            rerenderFlag = true
        } else if (!eMailRegex.test(email)){
            errorsToShow.email = <ErrorReport msg="Neočekávaný formát e-mailové adresy!"/>
        }
        
        if (password === "") {
            errorsToShow.password = <ErrorReport msg="Heslo budeš potřebovat pro přihlášení!"/>
            rerenderFlag = true }
        
        
        if (password != passwordRepeated) {
            errorsToShow.passwordRepeated = <ErrorReport msg="Uvedená hesla se neshodují!"/>
            rerenderFlag = true }

        
        if(rerenderFlag) {
            setErrors(errorsToShow)
            return
        }
            
        const cred: Credentials = {email: email, password: password}
        auth.signup(cred, ((status: number, data : any) => {
            if (status != 200) 
            {
                // console.log(data)
                errorsToShow.passwordRepeated = <ErrorReport msg={data.message}/>
                setErrors(errorsToShow)
            } 
            else {
                // let from = location.state?.from?.pathname || "/";
                navigate("/sign-up-details", { state: {from: location.pathname} })
            }
        }))
        // dispatch(signUp(cred))
        //     .unwrap()
        //     .then(token => { 
        //         localStorage.setItem('access_token', token.access_token)
        //         history.push('/sign-up-details')
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //         errorsToShow.email = <ErrorReport msg={error.message}/>
        //         setErrors(errorsToShow)
        //     })

            // auth.signup(cred, () => {
            //     navigate("/sign-up-details")
            // })
    }

    return (
        <div className='d-flex flex-column signup-accessData-wrapper'>
                <div className="signUp-title">Registrace nového hráče</div>
                <div className="d-flex flex-column w-100 justify-content-center">
                    <div className="content-inner-box w-100">
                        <div className="d-flex flex-column p-5 signUp-accessData rounded-3 bg-white shadow">
                            <form onSubmit={handleSignUp}>  
                                <div className="form-group">
                                    <label className="form-label">E-mail</label>
                                    <FormInput 
                                        onChange={(e: React.FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)}
                                        placeholder="Zadej přihlašovací e-mail" type="email" value={email}/>
                                    {errors.email}
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Heslo</label>
                                    <FormInput
                                        onChange={(e: React.FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)}
                                        placeholder="Zadej přístupové heslo" type="password" value={password}/>
                                    {errors.password}
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Potvrzení hesla</label>
                                    <FormInput
                                        onChange={(e: React.FormEvent<HTMLInputElement>) => setPasswordRepeated(e.currentTarget.value)}
                                        placeholder="Zopakuj heslo pro kontrolu" type="password" value={passwordRepeated}/>
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