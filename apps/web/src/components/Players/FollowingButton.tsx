import React, { useState } from "react"
import { Button } from "../FormElements"

interface FollowingButtonProps {
    sectionClass?: string
    unfollowCb: () => void
}

export const FollowingButton = ( { sectionClass, unfollowCb }: FollowingButtonProps ) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div className={sectionClass} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            {isHovered ?
                <Button caption={"Nesledovat"} className={"btn btn-sm btn-danger rounded"} onClick={unfollowCb}/>
                :
                <Button caption={"Sleduji"} className={"btn btn-sm btn-success rounded"}/>
                // <Button caption={"Nesledovat"} className={"btn btn-primary danger"}/>
            }
            
        </div>
    )
}