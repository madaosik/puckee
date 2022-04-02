// import { GamesList } from "../features/games/GamesList"
// import { useAppDispatch } from "../app/store"
// import { Button } from "../components"
// import { signOut } from "../features/auth/authSlice"
// import AthleteProfile from "../features/auth/AthleteProfile"
// import { signOut } from "../features/auth/authSlice"
import LoginForm from "../features/auth/LoginForm"
import SignUpForm from "../features/auth/SignUpForm";
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from "react-router-dom";
import { MdPerson, MdOutlineSportsHockey } from 'react-icons/md'
import { FaHockeyPuck } from "react-icons/fa";
import React from "react"
// import SignUpForm from "../features/auth/SignUpForm";
// import history from '../routes/history'

const Auth = () => {
    // const previousState = useLocation<LocationState>().state
    // history.push('/sign-in', {from: previousState.from.pathname })
    return (
        <Router>
            <nav className="navbar navbar-expand-lg navbar-blue">
                <div className="container">
                    <div className="navbar-brand">
                        <h1>Puckee
                        <FaHockeyPuck size={40} color="white" key="heading-puck" style={styles.brand}/>
                        </h1>
                    </div>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to={"/sign-in"}>Přihlášení</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/sign-up"}>Registrace</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <div style={styles.authWrapper as React.CSSProperties}>
                <div style={styles.authInner}>
                    <Switch>
                        <Route exact path='/' component={LoginForm} />
                        <Route path="/sign-in" component={LoginForm} />
                        <Route path="/sign-up" component={SignUpForm} />
                    </Switch>
                </div>
            </div>
        </Router>
        
    )
}

const styles = {
    brand: {
        marginLeft: '1rem',
        marginRight: '1rem'
    },
    authWrapper: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'left',
        alignItems: 'center',
        marginTop: '100px',
    },
    authInner: {
        width: '450px',
        margin: 'auto',
        background: '#ffffff',
        boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
        padding: '40px 55px 45px 55px',
        borderRadius: '15px',
        transition: 'all .3s',
    }
}

export default Auth