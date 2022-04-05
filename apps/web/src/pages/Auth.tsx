import LoginForm from "../components/Auth/LoginForm"
import React from "react"
import AuthHeader from "../components/Auth/AuthHeader"

interface AuthWindowProps {
    content: JSX.Element,
}

const Auth = ( { content } : AuthWindowProps) => {
    console.log(content.key)
    return (
        <>
            <AuthHeader/>
            <div className="container min-vh-100">
                <div className="centeringFlex">
                    <div className="authFlex">
                            {content}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Auth