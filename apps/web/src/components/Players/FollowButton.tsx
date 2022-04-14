import React from "react"
import { Button } from "../FormElements"

interface FollowButtonProps {
    followCb: () => void
}

export const FollowButton = ( { followCb }: FollowButtonProps ) => {
    // const [isHovered, setIsHovered] = useState(false)

    return (
        <Button caption={"Sledovat"} className={"btn btn-sm btn-primary rounded"} onClick={followCb}/>
    ) 
}