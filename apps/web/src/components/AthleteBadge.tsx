import { AnonymAthlete, Athlete, AthleteType, IAnonymAthlete, IAthlete, instanceOfAnonymAthlete } from "puckee-common/types";
import React from "react";
import { CgProfile } from "react-icons/cg";
import Avatar from '@mui/material/Avatar'
import { stringAvatar } from 'puckee-common/utils/avatar'
import { AiFillMinusCircle } from 'react-icons/ai'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'

interface AthleteBadgeProps {
    athlete: AthleteType
    registered: boolean
    showFollow: boolean
}

const athleteAvatar = (isRegistered: boolean, name: string) => {
    return isRegistered ? <Avatar {...stringAvatar(name, 28)} /> : <CgProfile size={28}/>
}

const classNameBasedOnFollowStatus = (athlete: Athlete | IAthlete ) : string => {
    if (!athlete.follow!) {
        return ""
    }
    if (athlete.follow.opt_out_mode) {
        return "border border-3 border-success"
    } else {
        return "border border-3 border-dark"
    }
}

export function AthleteBadge ( {athlete, registered, showFollow} : AthleteBadgeProps ) {
    var borderClassName: string | null = null
    if (showFollow && !instanceOfAnonymAthlete(athlete)) {
        borderClassName = classNameBasedOnFollowStatus(athlete as IAthlete)
    }

    return (
        <div className={`d-flex flex-row justify-content-between align-items-center shadow athleteBadge-wrapper ${borderClassName}`}>
            <div className="ms-2">
                { athleteAvatar(registered, athlete.name) }
            </div>
            <div className="d-flex flex-row justify-content-end ms-2 pe-2">
                <div className="athleteBadge-athleteName">{athlete.name}</div>
            </div>

        </div>
    )
}

// 

interface RemovableAthleteBadgeProps extends AthleteBadgeProps {
    removeCb : (id: string | number )=> void
}

export function RemovableAthleteBadge( { athlete, showFollow, registered, removeCb }: RemovableAthleteBadgeProps) {
    var removeCbParam: number | string
    athlete.id ? removeCbParam = athlete.id : removeCbParam = athlete.name

    if(!removeCbParam) {
        throw new Error("Unable to get identification of athlete for his removal!")
    }

    var borderClassName: string = ""
    if (showFollow && !instanceOfAnonymAthlete(athlete)) {
        borderClassName = classNameBasedOnFollowStatus(athlete as IAthlete)
    }

    return (
        <div className={`d-flex flex-row justify-content-between align-items-center shadow athleteBadge-wrapper removable ${borderClassName}`}>
            <div className="ms-2">
                { athleteAvatar(registered, athlete.name) }
            </div>
            <div className="d-flex flex-row justify-content-end ms-2 pe-2">
                <div className="athleteBadge-athleteName">
                    {athlete.name}
                </div>
                <div onClick={() => removeCb(removeCbParam)}>
                    <IconButton aria-label="delete" color="primary">
                        <DeleteIcon />
                    </IconButton>
                </div>
            </div>
        </div>
    )
}