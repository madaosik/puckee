import { useAppSelector } from "puckee-common/redux/store";
import { Athlete } from "puckee-common/types";
import React from "react"
import { FaHockeyPuck } from "react-icons/fa";
import { Link } from "react-router-dom";

const AuthHeader = () => {
    
    // const { token, userData } = useAppSelector((state) => state.auth);
    // var user
    // token ? user = new Athlete().deserialize(userData) : user = undefined
    const user = undefined
    return (
        <nav className="navbar navbar-expand-lg navbar-blue">
            <div className="container">
                <div className="navbar-brand">
                    <h1>Puckee
                    <FaHockeyPuck size={40} color="white" key="heading-puck" className="authHeader-brand"/>
                    </h1>
                </div>
                { user ?
                    <div style={{ color: "white", fontSize: 20}}>Přihlášen: {user.email}</div>
                    :
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to={"/sign-in"}>Přihlášení</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/sign-up"}>Registrace</Link>
                    </li>
                </ul>
                }
            </div>
        </nav>
    )
}

export default AuthHeader




