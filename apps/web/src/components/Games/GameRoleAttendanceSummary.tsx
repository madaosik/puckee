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
    var greyColor = "#A9A9A9"

    switch (role) {
        case (AthleteRole.Player): {
            if (game) {
                currentCount = game.players.length + game.anonym_players.length
                expCount = game.exp_players_cnt
            } else {
                currentCount = cnt!
                expCount = totalCnt!
            }
            icon = <PlayerIcon color={currentCount == expCount ? "#dc3545" : greyColor} height={70}/>
            break;
        }
        case (AthleteRole.Goalie): {
            if (game) {
                currentCount = game.goalies.length + game.anonym_goalies.length
                expCount = game.exp_goalies_cnt
            } else {
                currentCount = cnt!
                expCount = totalCnt!
            }
            icon = <GoalieIcon color={currentCount == expCount ? "#dc3545" : greyColor} height={70}/>
            break;
        }
        case (AthleteRole.Referee): {
            if (game) {
                currentCount = game.referees.length + game.anonym_referees.length
                expCount = game.exp_referees_cnt
            } else {
                currentCount = cnt!
                expCount = totalCnt!
            }
            icon = <RefereeIcon color={currentCount == expCount ? "#dc3545" : greyColor} height={65}/>
            break;
        }
        default: {
            throw new Error(`Unexpected role has been provided: ${role}`)
        }
    }

  

    return (
        <div className="w-100">
            {/* <div className="d-flex flex-row justify-content-center"> */}
            <div className="d-flex flex-column justify-content-center">{icon}</div>
            {/* </div> */}
            <div className="gameDetail-attendeeCntDesc">
                <div className={currentCount == expCount ? "text-danger" : greyColor}>
                    {currentCount}/{expCount}
                </div>
            </div>
        </div>
    )
}



