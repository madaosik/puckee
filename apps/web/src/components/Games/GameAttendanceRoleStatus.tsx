import React, { useState } from "react"
import { Athlete, AthleteRole, Game } from "puckee-common/types"
import { Link } from "react-router-dom"
import { GameAttendanceRoleSelector } from "./GameAttendanceRoleSelector"
import { GameAttendanceRoleSelected } from "./GameAttendanceRoleSelected"
import { useAuth } from "puckee-common/auth"
import { Button } from "../FormElements"
import { NOTIFICATION, useNotifications } from "puckee-common/context/NotificationsContext"
import Tooltip from "@mui/material/Tooltip"

interface GameAttendanceRoleStatusProps {
    game: Game
    isInvertedColor: boolean
    showMoney: boolean
    showAttDesc: boolean
    role: AthleteRole | undefined
    roleSetter: (role: AthleteRole | undefined) => void
    joinBtnClass: string
}

export const GameAttendanceRoleStatus = ( { isInvertedColor, game, showMoney, showAttDesc, role, roleSetter, joinBtnClass } : GameAttendanceRoleStatusProps) => {
    const auth = useAuth()
    const user = new Athlete().deserialize(auth.userData.athlete)
    const isOnlyUser = user.uniqueRole() == AthleteRole.User ? true: false
    const { setNotification } = useNotifications()

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
        return <GameAttendanceRoleSelector isInvertedColor={isInvertedColor} game={game} confirmedRole={role} currentUser={user} roleSelectionCb={setRole}/>
    }
    
    // Role is currently not being selected
    // If there is a role assigned already, show the currently assigned role with icon
    // with a possibility to re-enter the selection process after click.
    if (role) 
    {
        // return <GameAttendanceRoleSelected selectToggle={toggleSelection} role={role}/>
        return <GameAttendanceRoleSelected game={game} showMoney={showMoney} showAttDesc={showAttDesc} isInvertedColor={isInvertedColor} role={role}/>
    }
    // If there is no role assigned, show the "Join button"
    else 
    {
        // return <Link to={"#"} onClick={() => showAttendanceSelector()}>Přihlásit se</Link>
        if (isOnlyUser) {
            return(
                <Tooltip title={`Před přihlášením na utkání je třeba dokončit registraci v osobním profilu!`} followCursor>
                    <div onClick={ () => setNotification({message: `Před přihlášením na utkání je třeba dokončit registraci v osobním profilu!`, variant: NOTIFICATION.ALERT, timeout: 4000}) }>
                        <Button caption={"Přihlásit"} className={joinBtnClass} onClick={() => showAttendanceSelector()} disabled/>
                    </div>
                </Tooltip>
            )
        } else {
            return <Button caption={"Přihlásit"} className={joinBtnClass} onClick={() => showAttendanceSelector()}/>
                // <Tooltip title={`Před přihlášením na utkání je třeba dokončit registraci v osobním profilu!`} followCursor>
                //     <div><RoleIcon color={isInvertedColor ? "white" : "black"} height={35}/></div>
                // </Tooltip>
                
                // )
        }

    }
}
