import Avatar from "@mui/material/Avatar"
import { useAuth } from "puckee-common/auth"
import { Athlete, AthleteRole } from "puckee-common/types"
import { stringAvatar } from 'puckee-common/utils/avatar'
import React from "react"
import { CgProfile } from "react-icons/cg"

interface UserProfileDataProps {
    user: Athlete
}

export default function UserProfileData( { user }: UserProfileDataProps )
{
    // const isOnlyUser = user.uniqueRole() == AthleteRole.User ? true : false
    return (
        <div className="content-inner-box">
            <div className="content-inner-row data">
                <div className="d-flex flex-row">
                    <div className="flex-1"><Avatar {...stringAvatar(`${user.name} ${user.surname}`, 50)} /></div>
                        <div className="d-flex flex-row align-items-center flex-6 fw-bolder" style={{'fontSize': '1.4rem'}}>
                            {`${user.name} ${user.surname}`}
                        </div>
                    </div>
            </div>
        </div>
    )
}