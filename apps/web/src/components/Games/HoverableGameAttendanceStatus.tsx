import axios from "axios"
import { API_BASE } from "puckee-common/api"
import { Athlete, AthleteRole, Game, IGameParticipantsAPI } from "puckee-common/types"
import React, { useState } from "react"
import { useMutation } from "react-query"
import { re } from "../../../node_modulesOLD/semver/internal/re"
import { GameAttendanceRoleStatus } from "./GameAttendanceRoleStatus"
import { queryClient } from "../../../App"
import { Button } from "../FormElements"
import { NOTIFICATION, useNotifications } from "puckee-common/context/NotificationsContext"

interface HoverableGameAttendanceStatusProps {
    game: Game
    isInvertedColor: boolean
    user: Athlete
    classStr: string
    joinBtnClass: string
}

export const HoverableGameAttendanceStatus = ({ classStr, isInvertedColor, game, user, joinBtnClass } : HoverableGameAttendanceStatusProps) => {
    const [isHovered, setIsHovered] = useState(false)
    const [gameRole, setGameRole] = useState<AthleteRole | undefined>(game.participantRole(user))
    const { setNotification } = useNotifications()


    let config = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
      }

    const addRolemutation = useMutation((addRole : IGameParticipantsAPI) => {
        return axios.post(`${API_BASE}/game/${game.id}/participants`, JSON.stringify(addRole), config)
      },
        {
            onSuccess: (response) => {
                queryClient.invalidateQueries('games')
                queryClient.invalidateQueries(['game', game.id.toString()])
                setGameRole(parseInt(response.data.role_id))
                setNotification({message: `Byl jsi úspěšně přihlášen na utkání '${game.name}' jako '${AthleteRole[response.data.role_id]}!`, variant: NOTIFICATION.SUCCESS, timeout: 4000})
            },
            onError: (error) => {
                console.error(error)
            }
        }
    )

    const removeRoleMutation = useMutation( () => {
        return axios.delete(`${API_BASE}/game/${game.id}/participants?athlete_id=${user.id}`)
    },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('games')
                queryClient.invalidateQueries(['game', game.id.toString()])
                setGameRole(undefined)
                setNotification({message: `Odhlášení z utkání '${game.name}' proběhlo úspěšně`, variant: NOTIFICATION.SUCCESS, timeout: 4000})
            },
        onError: (error) => {
            console.error(error)
            setNotification({message: "Nepodařilo se odhlásit z utkání!", variant: NOTIFICATION.ERROR, timeout: 4000})
        }
    })

    const updateGameStatus = (role: AthleteRole | undefined) => {
        if (role) {
            // console.log(role)
            addRolemutation.mutate({ athlete_id: user.id, athlete_role: role })
        } 
        else {
            // Check if this was not called just as a callback called by selection cancellation - i.e. if there is actually a role to be removed
            if (gameRole) {
                removeRoleMutation.mutate()
            }
        }
    }
        

    const hoverCb = () => {
        setIsHovered(true)
    }

    const unHoverCb = () => {
        setIsHovered(false)
    }

    const roleStatusSelector = () => {
        return (
            <div className={classStr} onMouseEnter={hoverCb} onMouseLeave={unHoverCb}>
                <GameAttendanceRoleStatus isInvertedColor={isInvertedColor} game={game} joinBtnClass={joinBtnClass} role={gameRole} roleSetter={updateGameStatus}/>
            </div>
        )
    }

    // Div is not under hover, render standard selector (either currently selected role or "Join" button)
    if(!isHovered) return roleStatusSelector()

    // Div is under hover 
    if (gameRole) { 
        return (
            <div className={classStr} onMouseEnter={hoverCb} onMouseLeave={unHoverCb}>
                <Button caption={"Odhlásit"} className={"btn btn-sm btn-danger btn-block rounded"} onClick={() => updateGameStatus(undefined)}/>
            </div>
        )
    } else {
        return roleStatusSelector()
    }
  }