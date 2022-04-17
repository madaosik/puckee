import React, { useState } from "react"
import { Button } from "../FormElements"
import { OptOutSwitch } from "./OptOutSwitch"

interface FollowingButtonProps {
    sectionClass?: string
    unfollowCb: () => void
    optOutModeActive: boolean
    followModeSwitchCb: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const FollowingButton = ( { sectionClass, unfollowCb, optOutModeActive, followModeSwitchCb }: FollowingButtonProps ) => {
    const [isHovered, setIsHovered] = useState(false)

    // const handleChange = (event: any) => {
    // setState({ ...state, [event.target.name]: event.target.checked });
    // };

    return (
            <div className={sectionClass}>
                    <div className="d-flex flex-column justify-content-center followBtnSection" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                        {isHovered ?
                            <Button caption={"Nesleduj"} className={"btn btn-sm btn-danger btn-block rounded"} onClick={unfollowCb}/>
                            :
                            <Button caption={"Sleduji"} className={"btn btn-sm btn-success btn-block rounded"}/>
                            // <Button caption={"Nesledovat"} className={"btn btn-primary danger"}/>
                        }
                    </div>
                    <OptOutSwitch active={optOutModeActive} switchCb={followModeSwitchCb}/>
            </div>
    )
}

