import React from "react"
import { Link } from "react-router-dom"
import { FaHockeyPuck } from "react-icons/fa";

const VerticalMenu = () => {
    return (
        <div className="item two special">
            <div className="sidebar-brand">
                <div className="navbar-brand">
                    <h2>Puckee</h2>
                    <FaHockeyPuck size={35} color="white" key="heading-puck" style={styles.brand}/>
                </div>
            </div>
            <div className="sidebar-menu">
                <nav className="navbar navbar-collapse">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to={"/dashboard"}>Nástěnka</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/games"}>Utkání</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/players"}>Hráči</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/groups"}>Skupiny</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

const styles = {
    brand: {
        marginBottom: '5px',
        marginLeft: '0.5rem',
        // marginRight: '1rem'
    }
}


export default VerticalMenu