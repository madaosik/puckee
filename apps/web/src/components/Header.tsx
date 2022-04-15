import React, { useState } from "react"
import { MdKeyboardArrowLeft } from "react-icons/md"
import { NavLink, Link, useNavigate } from "react-router-dom"
import Dropdown from 'react-bootstrap/Dropdown'
import SplitButton from 'react-bootstrap/SplitButton'
import { Athlete, IAthlete } from "puckee-common/types"
import { useAuth } from "puckee-common/auth"


export interface HeaderProps {
    // backPath?: string,
    headerContent?: JSX.Element
}

export const Header = ( { headerContent } : HeaderProps ) => {
    // const { userData } = useAppSelector((state) => state.auth);
    // const user = new Athlete().deserialize(userData)
    // const previousState = useLocation<LocationState>().state
    const auth = useAuth()

    const user: IAthlete = auth.userData.athlete
    const printNavHeader = () => {
        return (
            <div>
                <Link to={"/"}>
                    <MdKeyboardArrowLeft size={70} className="backIcon"/>
                </Link>
                {headerContent}
            </div>
        )
    }

    return (
        <div className="item one">
            <div className="content-header">
                {/* <div className="pageHeader">  */}
                    <div className="pageHeader with-icon">
                        { headerContent && printNavHeader() }
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
    const auth = useAuth()
    const navigate = useNavigate()

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
                        <Dropdown.Item eventKey="2" 
                            onClick={() => auth.signout(() => navigate("/login"))}
                        >
                            Odhlásit se
                        </Dropdown.Item>
                    </SplitButton>
                </div>
            </div>
        </div>
    )
}



