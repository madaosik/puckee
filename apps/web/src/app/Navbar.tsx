import React from 'react'
import { Link } from 'react-router-dom'
// import { Button } from '../components'
import { useAppSelector } from './store'
// import { signOut } from '../features/auth/authSlice'
// import { IAthlete } from '../types'
// import { Athlete } from '../types/Athlete'
import { MdPerson, MdOutlineSportsHockey } from 'react-icons/md'
import { FaHockeyPuck } from "react-icons/fa";

export const Navbar = () => {

  const {token, userData} = useAppSelector(state => state.auth)
  // const dispatch = useAppDispatch()
  // var signoutButtonCaption = "Odhlásit se"
  // if (userData) {
    // signoutButtonCaption = userData.name
  // }
  console.log(token)
  return (
    <nav>
      <section>
        <div className="appHeadingWrapper">
          <div className="appHeading">
            <div className="appHeadingGraphics">
                <MdOutlineSportsHockey size={60} color="white" key="heading-puck" style={{marginLeft: '1rem'}}/>
            </div>
            <div className="appHeadingName">
              <h1>
                <FaHockeyPuck size={32} color="white" key="heading-puck" style={{marginRight: '1rem'}}/>
                Puckee
              </h1>
            </div>
          </div>
          <div className="appNav">
            <div className="navContent">
                { token 
                  ?
                  <div className="navLinks">
                    <div className="navMain">
                      <Link to="/home">Přehled utkání</Link>
                    </div>
                    <div className="navProfile">
                      <Link to="/profile">
                        <MdPerson style={{marginRight: '0.5rem'}}/>{userData.name}
                        {/* <MdPerson className="navProfileImg"/> */}
                        
                      </Link>
                    </div>
                    {/* onClick={() => dispatch(signOut()) }> */}
                  </div> 
                  : 
                  ""}
            </div>
          </div>
        </div>
      </section>
    </nav>
  )
}
