import { useAppSelector } from "puckee-common/redux/store";
import { Athlete } from "puckee-common/types";
import React from "react"

export const UserProfileData : React.FC = () => {
    const { userData } = useAppSelector((state) => state.auth);
    // console.log(userData)
    const user = new Athlete().deserialize(userData)
    return (
        <div className="content-inner-box">
            <div className="content-inner-row data">
                <h3>{user.name ? user.name : "Bezejmenný hokejista"}</h3>
            </div>
        </div>
    )
}