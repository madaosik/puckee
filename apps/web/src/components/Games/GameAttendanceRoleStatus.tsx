import React, { useState } from "react"
import { Athlete, AthleteRole } from "puckee-common/types"
import { Link } from "react-router-dom"
import { useAppSelector } from "puckee-common/redux/store"
import { GameAttendanceRoleSelector } from "./GameAttendanceRoleSelector"
import { GameAttendanceRoleSelected } from "./GameAttendanceRoleSelected"
import { useAuth } from "puckee-common/auth"

interface GameAttendanceRoleStatusProps {
    role: AthleteRole | undefined
    roleSetter: (role: AthleteRole | undefined) => void
}

export const GameAttendanceRoleStatus = ( { role, roleSetter } : GameAttendanceRoleStatusProps) => {
    const auth = useAuth()
    const user = new Athlete().deserialize(auth.userData.athlete)
    const [roleInSelection, setRoleInSelection] = useState(false)
    const setRole = (role: AthleteRole | undefined): void => {
        setRoleInSelection(false)
        roleSetter(role)
    }
    const uniqueUserRole = user.uniqueRole()

    // const toggleSelection = (value: boolean) => {
    //     if (uniqueUserRole) {
    //         roleSetter(undefined)
    //     } else {
    //         setRoleInSelection(value)
    //     }
    // }
    
    const showAttendanceSelector = () => {
        // If the current user has only one role, just assign it to him without showing the role selector
        if (uniqueUserRole) {
            setRole(user.uniqueRole())
        } else {
            setRoleInSelection(true)
        }
    }

    if (roleInSelection) {
        return <GameAttendanceRoleSelector confirmedRole={role} currentUser={user} roleSelectionCb={setRole}/>
    }
    
    // Role is currently not being selected
    // If there is a role assigned already, show the currently assigned role with icon
    // with a possibility to re-enter the selection process after click.
    if (role) 
    {
        // return <GameAttendanceRoleSelected selectToggle={toggleSelection} role={role}/>
        return <GameAttendanceRoleSelected role={role}/>
    }
    // If there is no role assigned, show the "Join button"
    else 
    {
        return <Link to={"#"} onClick={() => showAttendanceSelector()}>Přihlásit se</Link>
    }
}
