import Tooltip from "@mui/material/Tooltip"
import { useAuth } from "puckee-common/auth"
import { NOTIFICATION, useNotifications } from "puckee-common/context/NotificationsContext"
import { Athlete, AthleteRole, IAthlete } from "puckee-common/types"
import React from "react"
import { Button } from "../FormElements"


interface FollowButtonProps {
    currentUser: IAthlete
    athlete: Athlete
    followCb: () => void
}

export const FollowButton = ( { currentUser, athlete, followCb }: FollowButtonProps ) => {
    // const [isHovered, setIsHovered] = useState(false)
    const auth = useAuth()
    const user = new Athlete().deserialize(auth.userData.athlete)
    const isOnlyUser = user.uniqueRole() == AthleteRole.User ? true: false
    const { setNotification } = useNotifications()

    var hide : boolean
    currentUser.id == athlete.id ? hide=true : hide=false

    if (hide) {
        return <></>
    }


    if (isOnlyUser) {
        return(
            <Tooltip title={`Před sledováním hráčů je třeba dokončit registraci v osobním profilu!`} followCursor>
                <div onClick={ () => setNotification({message: `Před sledováním hráčů je třeba dokončit registraci v osobním profilu!`, variant: NOTIFICATION.ALERT, timeout: 4000}) }>
                    <Button caption={"Sledovat"} className={"btn btn-sm btn-block btn-outline-primary rounded"} disabled/>
                </div>
            </Tooltip>
        )
    } else {
        return <Button caption={"Sledovat"} className={"btn btn-sm btn-block btn-outline-primary rounded"} onClick={followCb}/>
    }

}