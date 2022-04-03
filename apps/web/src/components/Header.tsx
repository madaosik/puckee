import React, { useState } from "react"
import { MdKeyboardArrowLeft } from "react-icons/md"
import { NavLink, Link, useLocation } from "react-router-dom"
import Dropdown from 'react-bootstrap/Dropdown'
import SplitButton from 'react-bootstrap/SplitButton'
import { useAppDispatch, useAppSelector } from "puckee-common/redux/store"
import { Athlete } from "puckee-common/types"
import { signOut } from "puckee-common/features/auth/authSlice"
import { LocationState } from "../features/auth/LoginForm"


export interface HeaderProps {
    backPath?: string,
    headerContent?: string
}

export const Header = ( props : HeaderProps ) => {
    const { userData } = useAppSelector((state) => state.auth);
    const user = new Athlete().deserialize(userData)
    const previousState = useLocation<LocationState>().state
    
    return (
        <div className="item one">
            {props.headerContent ?
                <div className="pageHeader"> 
                    <Link to={props.backPath}>
                        <MdKeyboardArrowLeft size={70} color={"#FFFFFF"}/>
                    </Link>
                    {props.headerContent}
                </div>
                :
                <></>
                }
                <UserBadge userName={user.name}/>
        </div>
    )
}

interface UserBadgeType {
    userName: string
}

const UserBadge = ( { userName } : UserBadgeType ) => {
    const dispatch = useAppDispatch()
    
    const logOutUser = () => {
        dispatch(signOut())
    }

    return (
        <div className="userProfileToken">
            {
                <SplitButton
                    align="end"
                    key={'primary'}
                    id={`dropdown-split-variants-primary`}
                    variant={'secondary'}
                    title={userName}
                >   <Link to={"/profile"} style={{ textDecoration: 'none' }}></Link>
                    <Dropdown.Item as={NavLink} to="/profile" eventKey="1" active>
                        Profil
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey="2" onClick={logOutUser}>Odhlásit se</Dropdown.Item>
                </SplitButton>
            }
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


