import React, { useState } from "react"
import { MdKeyboardArrowLeft } from "react-icons/md"
import { NavLink, Link, useLocation } from "react-router-dom"
import Dropdown from 'react-bootstrap/Dropdown'
import SplitButton from 'react-bootstrap/SplitButton'
import { useAppDispatch, useAppSelector } from "puckee-common/redux/store"
import { Athlete } from "puckee-common/types"
import { signOut } from "puckee-common/features/auth/authSlice"
import { LocationState } from "./Auth/LoginForm"


export interface HeaderProps {
    backPath?: string,
    headerContent?: string
}

export const Header = ( props : HeaderProps ) => {
    const { userData } = useAppSelector((state) => state.auth);
    const user = new Athlete().deserialize(userData)
    const previousState = useLocation<LocationState>().state
    
    const printNavHeader = () => {
        return (
            <div>
                <Link to={props.backPath}>
                    <MdKeyboardArrowLeft size={70} className="backIcon"/>
                </Link>
                {props.headerContent}
            </div>
        )
    }

    return (
        <div className="item one">
            <div className="content-header">
                {/* <div className="pageHeader">  */}
                    <div className="pageHeader with-icon">
                        { props.headerContent && printNavHeader() }
                    </div>
                    {
                        user.name ?
                        <UserBadge userName={user.name}/>
                        :
                        <UserBadge userEmail={user.email}/>
                    }
                {/* </div> */}
            </div>
        </div>
    )
}

interface UserBadgeType {
    userName?: string
    userEmail?: string
}

const UserBadge = ( { userName, userEmail } : UserBadgeType ) => {
    const dispatch = useAppDispatch()
    
    const logOutUser = () => {
        dispatch(signOut())
    }

    return (
        <div className="pageHeader-userSection">
            <div className="unverifiedUserReport">
                {userEmail && "Neověřený uživatel"}
            </div>
            <div className="userProfileToken">
                <div className="userBadgeButton">
                    <SplitButton
                        align="end"
                        key={'primary'}
                        id={`dropdown-split-variants-primary`}
                        variant={'primary'}
                        title={userName ? userName : userEmail}
                        className="nazdar"
                    >   
                        {/* <Link to={"/profile"} style={{ textDecoration: 'none' }}></Link> */}
                        <Dropdown.Item as={NavLink} to="/profile" eventKey="1" active>
                            Profil
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item eventKey="2" onClick={logOutUser}>Odhlásit se</Dropdown.Item>
                    </SplitButton>
                </div>
            </div>
        </div>
    )
}

// const styles = {
//     heading: {
//         fontWeight: 'bold',
//         color: 'white',
//         fontSize: 28,
//         flex: '5',
//         // backgroundColor: 'red'
//     },
//     heading:hover {
//         color: 'var(--app-color-primary-btns')
//     }
//     userProfileToken: {
//         color: 'white',
//         flex: '1',
//         // backgroundColor: 'aqua',
//         display: 'flex',
//         justifyContent: 'flex-end'
//     }
// }


