import React, { useState } from "react"
import { UserProfileRating } from "./UserProfileRating"
import { UserProfileGamesPlayed } from "./UserProfileGamesPlayed"
import { UserProfileMyFollowers } from "./UserProfileMyFollowers"
import { UserProfileImFollowing } from "./UserProfileImFollowing"
import UserProfileData from "./UserProfileData"
import { Header } from "../Header"
import VerticalMenu from "../VerticalMenu"
import { useAuth } from "puckee-common/auth"
import { Athlete, AthleteRole } from "puckee-common/types"
import { SignUpDetailsForm } from "../Auth"
import { useLocation } from "react-router-dom"

export default function UserProfile()
{
    const location = useLocation()
    const auth = useAuth()
    var user: Athlete
    
    if(location.state?.regSuccess) {
        user = new Athlete().deserialize(location.state!.updatedUserData)
    } else {
        user = new Athlete().deserialize(auth.userData.athlete)
    }

    const isOnlyUser = user.uniqueRole() == AthleteRole.User ? true : false
    return (
        <>
            <Header />
            <VerticalMenu/>
            <div className="main-content">
                <div className="content-container">
                    { 
                    isOnlyUser ?
                        (
                            <div className="d-flex flex-column align-items-center">
                                <SignUpDetailsForm/>
                            </div>
                        )
                        :
                        (
                        <>
                            <div className="content-row columns userProfileUpper">
                                <div className="leftContentColumn userProfileUpper">
                                    <div className="userData">
                                        <UserProfileData user={user}/>
                                    </div>
                                    <div className="playedGames">
                                        <UserProfileGamesPlayed/>
                                    </div>
                                </div>
                                <div className="rightContentColumn userProfileUpper">
                                    <UserProfileRating/>
                                </div>
                            </div>
                            <div className="content-row columns">
                                <div className="leftContentColumn">
                                    <UserProfileImFollowing/>
                                </div>
                                <div className="rightContentColumn no-btn">
                                    <UserProfileMyFollowers/>
                                </div>
                            </div>
                        </>
                        )
                    }
                </div>
            </div>
        </>
    )
}