import { Athlete } from "puckee-common/types";
import React from "react";
import { CgProfile } from "react-icons/cg";
import Avatar from '@mui/material/Avatar'
import { stringAvatar } from 'puckee-common/utils/avatar'

interface AthleteBadgeProps {
    athlete: Athlete
    registered: boolean
}

export default function AthleteBadge ( {athlete, registered} : AthleteBadgeProps ) {
    return (
        // mt-2 me-2
        <div className="d-flex flex-row justify-content-between athleteBadge-wrapper align-items-center shadow">
            <div className="ms-2">
                {
                    registered ?
                    <Avatar {...stringAvatar(athlete.name, 28)} />
                    :
                    <CgProfile size={28}/>
                }
            </div>
            <div className="d-flex flex-row justify-content-end ms-2 pe-2">
                <div className="athleteBadge-athleteName">{athlete.name}</div>
            </div>
        </div>
    )
}