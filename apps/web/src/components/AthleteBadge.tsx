import { Athlete, IAthlete } from "puckee-common/types";
import React from "react";
import { CgProfile } from "react-icons/cg";
import Avatar from '@mui/material/Avatar'
import { stringAvatar } from 'puckee-common/utils/avatar'
import { AiFillMinusCircle } from 'react-icons/ai'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'

interface AthleteBadgeProps {
    athlete?: Athlete
    iAthlete?: IAthlete
    registered: boolean
}

const athleteAvatar = (isRegistered: boolean, name: string) => {
    return isRegistered ? <Avatar {...stringAvatar(name, 28)} /> : <CgProfile size={28}/>
}

export function AthleteBadge ( {athlete, iAthlete, registered} : AthleteBadgeProps ) {
    const refAthlete = athlete ? athlete : iAthlete
    
    return (
        <div className="d-flex flex-row justify-content-between align-items-center shadow athleteBadge-wrapper">
            <div className="ms-2">
                { athleteAvatar(registered, refAthlete!.name) }
            </div>
            <div className="d-flex flex-row justify-content-end ms-2 pe-2">
                <div className="athleteBadge-athleteName">{refAthlete!.name}</div>
            </div>

        </div>
    )
}

interface RemovableAthleteBadgeProps extends AthleteBadgeProps {
    removeCb : (id: number) => void
}

export function RemovableAthleteBadge( { athlete, iAthlete, registered, removeCb }: RemovableAthleteBadgeProps) {
    const refAthlete = athlete ? athlete : iAthlete
    console.log("rendering")
    return (
        <div className="d-flex flex-row justify-content-between align-items-center shadow athleteBadge-wrapper removable">
            <div className="ms-2">
                { athleteAvatar(registered, refAthlete!.name) }
            </div>
        <div className="d-flex flex-row justify-content-end ms-2 pe-2">
            <div className="athleteBadge-athleteName">{refAthlete!.name}</div>
            <div onClick={() => removeCb(refAthlete!.id)}>
                <IconButton aria-label="delete" color="primary">
                    <DeleteIcon />
                </IconButton>
            </div>
        </div>
    </div>
    )
}