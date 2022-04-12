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
    
    const { userData } = useAppSelector((state) => state.auth);
    const user = new Athlete().deserialize(userData)

    const uniqueUserRole = user.uniqueRole()

    const toggleSelection = (value: boolean) => {
        uniqueUserRole ? roleSetter(undefined) : setRoleInSelection(value)
    }
    
    const setRole = (role: AthleteRole | undefined): void => {
        setRoleInSelection(false)
        roleSetter(role)
    }
    
    const showAttendanceSelector = () => uniqueUserRole ? roleSetter(user.uniqueRole()) : setRoleInSelection(true)

    return (
        <>
        {
        roleInSelection 
        ?
            <GameAttendanceRoleSelector confirmedRole={role} currentUser={user} roleSelectionCb={setRole}/>
        :
            role ?
                <GameAttendanceRoleSelected selectToggle={toggleSelection} role={role}/>
        :
            <Link to={"#"} onClick={() => showAttendanceSelector()}>Přihlásit se</Link>
        }
        </>
    )
}
