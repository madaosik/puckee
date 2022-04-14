import { Athlete } from "puckee-common/types"
import React from "react"
import { Button } from "../FormElements"

interface FollowButtonProps {
    currentUser: Athlete
    athlete: Athlete
    followCb: () => void
}

export const FollowButton = ( { currentUser, athlete, followCb }: FollowButtonProps ) => {
    // const [isHovered, setIsHovered] = useState(false)

    var hide : boolean
    currentUser.id == athlete.id ? hide=true : hide=false

    if (hide) {
        return <></>
    }

    return (
            <Button caption={"Sledovat"} className={"btn btn-sm btn-outline-primary rounded"} onClick={followCb}/>
    )
}