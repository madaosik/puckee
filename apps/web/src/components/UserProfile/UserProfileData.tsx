import { useAuth } from "puckee-common/auth"
import { Athlete } from "puckee-common/types"
import React from "react"

export const UserProfileData : React.FC = () => {
    const auth = useAuth()
    const user = new Athlete().deserialize(auth.userData.athlete)
    
    return (
        <div className="content-inner-box">
            <div className="content-inner-row data">
                <h3>{user.name ? user.name : "Bezejmenný hokejista"}</h3>
            </div>
        </div>
    )
}