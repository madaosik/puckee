import React, {useState} from 'react';
import { FormInput, Button, ErrorReport } from '../FormElements'
import { Credentials } from 'puckee-common/types'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from 'puckee-common/auth'

export class SignInFormError {
    email: React.ReactNode
    password: React.ReactNode
    constructor() {
        this.email = <ErrorReport/>
        this.password = <ErrorReport/>
    }
}

const SignInForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState(new SignInFormError())
    const auth = useAuth()
    const location = useLocation()
    const navigate = useNavigate()

    const handleLogin = (e: React.FormEvent) => {
        var errorsToShow = new SignInFormError();
        e.preventDefault()
        const cred: Credentials = {email: email, password: password}
        auth.signin(cred, ((status: number, data : any) => {
            if (status != 200) 
            {
                // console.log(data)
                errorsToShow.password = <ErrorReport msg={data.message}/>
                setErrors(errorsToShow)
            } 
            else {
                let from = location.state?.from?.pathname || "/";
                navigate(from, { replace: true })
            }
        }))
    }

    return (
        <div className="loginWrapper">
            <form onSubmit={handleLogin}>
                <h3 style={{ marginBottom: "1rem" }}>Přihlášení</h3>
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
                    {errors.password}
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

export default SignInForm