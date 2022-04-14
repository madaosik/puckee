import axios from "axios"
import { API_BASE } from "puckee-common/api"
import { Athlete, AthleteRole, attendanceRole, IGame, IGameParticipantsAPI } from "puckee-common/types"
import React, { useState } from "react"
import { useMutation } from "react-query"
import { re } from "../../../node_modulesOLD/semver/internal/re"
import { GameAttendanceRoleStatus } from "./GameAttendanceRoleStatus"
import { queryClient } from "../../../App"

interface HoverableGameAttendanceStatusProps {
    game: IGame
    user: Athlete
    classStr: string
    // roleSetter: (role: AthleteRole | undefined) => void
    // currentGameRole: AthleteRole | undefined
}

export const HoverableGameAttendanceStatus = ({ classStr, game, user } : HoverableGameAttendanceStatusProps) => {
    const [isHovered, setIsHovered] = useState(false)
    const [gameRole, setGameRole] = useState<AthleteRole | undefined>(attendanceRole(user, game))


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
                setGameRole(parseInt(response.data.role_id))
            },
            onError: (error) => {
                console.error(error)
            }
        }
    )

    const removeRoleMutation = useMutation( () => {
        return axios.delete(`${API_BASE}/game/${game.id}/participants/${user.id}`)
    },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('games')
                setGameRole(undefined)
            },
        onError: (error) => {
            console.error(error)
        }
    })

    const updateGameStatus = (role: AthleteRole | undefined) => {
        if (role) {
            // console.log(role)
            addRolemutation.mutate({ athlete_id: user.id, athlete_role: role })
        } 
        else {
            removeRoleMutation.mutate()
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
                <GameAttendanceRoleStatus role={gameRole} roleSetter={updateGameStatus}/>
            </div>
        )
    }

    // Div is not under hover, render standard selector (either currently selected role or "Join" button)
    if(!isHovered) return roleStatusSelector()

    // Div is under hover 
    if (gameRole) { 
        return <div className={classStr} onMouseEnter={hoverCb} onMouseLeave={unHoverCb} onClick={() => updateGameStatus(undefined)}>Odhlásit se</div>
    } else {
        return roleStatusSelector()
    }
  }