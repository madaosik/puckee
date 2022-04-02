import React from "react"
import Button from "../Button"
import { UserProfileRating } from "./UserProfileRating"
import { UserProfileGamesPlayed } from "./UserProfileGamesPlayed"
import { UserProfileMyFollowers } from "./UserProfileMyFollowers"
import { UserProfileImFollowing } from "./UserProfileImFollowing"
import { UserProfileData } from "./UserProfileData"

const UserProfile : React.FC = () => {
    return (
        <div className="content-container">
            <div className="content-row columns userProfileUpper">
                <div className="leftContentColumn userProfileUpper">
                    <div className="userData">
                        <UserProfileData/>
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
        </div>
    )
}

export default UserProfile