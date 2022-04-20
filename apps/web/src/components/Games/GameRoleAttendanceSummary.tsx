import { AthleteRole, Game } from "puckee-common/types"
import React from "react"
import { GoalieIcon, PlayerIcon, RefereeIcon } from "../../Icons"

interface GameRoleAttendanceSummaryProps {
    role: AthleteRole
    game?: Game
    cnt?: number
    totalCnt?: number
}

export default function GameRoleAttendanceSummary( {role, game, cnt, totalCnt} : GameRoleAttendanceSummaryProps ) {
    var currentCount: number
    var expCount: number
    var icon: React.ReactNode
    var iconColor = "#A9A9A9"

    switch (role) {
        case (AthleteRole.Player): {
            if (game) {
            currentCount = game.players.length
            expCount = game.exp_players_cnt
            } else {
                currentCount = cnt!
                expCount = totalCnt!
            }
            icon = <PlayerIcon color={iconColor} height={70}/>
            break;
        }
        case (AthleteRole.Goalie): {
            if (game) {
            currentCount = game.goalies.length
            expCount = game.exp_goalies_cnt
            } else {
                currentCount = cnt!
                expCount = totalCnt!
            }
            icon = <GoalieIcon color={iconColor} height={70}/>
            break;
        }
        case (AthleteRole.Referee): {
            if (game) {
            currentCount = game.referees.length
            expCount = game.exp_referees_cnt
            } else {
                currentCount = cnt!
                expCount = totalCnt!
            }
            icon = <RefereeIcon color={iconColor} height={65}/>
            break;
        }
        default: {
            throw new Error(`Unexpected role has been provided: ${role}`)
        }
    }
    return (
        <>
            <div className="d-flex flex-row justify-content-center">
                {icon}
            </div>
            <div className="gameDetail-attendeeCntDesc">
                {currentCount}/{expCount}
            </div>
        </>
    )
}

