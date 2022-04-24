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
    removeReg?: (id: number) => void
    removeNonReg?: (name: string) => void
}

export function RemovableAthleteBadge( { athlete, showFollow, registered, removeReg, removeNonReg }: RemovableAthleteBadgeProps) {
    // var removeCbParam : {id? : number, name? : string}
    // athlete.id ? removeCbParam = {id: athlete.id} : removeCbParam = {name: athlete.name}

    // if(!removeCbParam) {
    //     console.log(athlete)
    //     // console.log(athlete.name)
    //     throw new Error("Unable to get identification of athlete for his removal!")
    // }

    var borderClassName: string = ""
    if (showFollow && !instanceOfAnonymAthlete(athlete)) {
        borderClassName = classNameBasedOnFollowStatus(athlete as IAthlete)
    }

    interface AthleteBadgeRemoveButtonProps {
        children: JSX.Element
    }
    const RemoveBadgeButton = ( { children } : AthleteBadgeRemoveButtonProps ) => {
        if (registered) {
            return (
                <div onClick={() => removeReg!(athlete.id as number)}>
                    {children}
                </div>
            )
        } else {
            return (
                <div onClick={() => removeNonReg!(athlete.name as string)}>
                    {children}
                </div>
            )
        }
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
                {
                    <RemoveBadgeButton children=
                            {
                                <IconButton aria-label="delete" color="primary">
                                    <DeleteIcon />
                                </IconButton>
                            }
                    />
                }
            </div>
        </div>
    )
}