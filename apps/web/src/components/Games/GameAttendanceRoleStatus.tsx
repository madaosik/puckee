import React, { useState } from "react"
import { Athlete, AthleteRole } from "puckee-common/types"
import { Link } from "react-router-dom"
import { useAppSelector } from "puckee-common/redux/store"
import { GameAttendanceRoleSelector } from "./GameAttendanceRoleSelector"
import { GameAttendanceRoleSelected } from "./GameAttendanceRoleSelected"

interface GameAttendanceRoleStatusProps {
    role: AthleteRole | undefined
    roleSetter: (role: AthleteRole | undefined) => void
}

export const GameAttendanceRoleStatus = ( { role, roleSetter } : GameAttendanceRoleStatusProps) => {
    const [roleInSelection, setRoleInSelection] = useState(false)
    
    const setRole = (role: AthleteRole | undefined): void => {
        setRoleInSelection(false)
        roleSetter(role)
    }
    
    return (
        <>
        {
        roleInSelection 
        ?
            <GameAttendanceRoleSelector confirmedRole={role} roleSelectionCb={setRole}/>
        :
            role ?
                <GameAttendanceRoleSelected selectTrigger={setRoleInSelection} role={role}/>
        :
            <Link to={"#"} onClick={() => setRoleInSelection(true)}>Přihlásit se</Link>
        }
        </>
    )
}
