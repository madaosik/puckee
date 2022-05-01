import { AthleteRole, Game } from "puckee-common/types"
import React from "react"
import { GoalieIcon, PlayerIcon, RefereeIcon } from "../../Icons"

interface GameAttendanceRoleSelectedProps {
    role: AthleteRole
    game: Game
    isInvertedColor: boolean
    showAttDesc: boolean
    showMoney: boolean
}

export const GameAttendanceRoleSelected = ( { game, role, isInvertedColor, showAttDesc, showMoney } : GameAttendanceRoleSelectedProps) => {
    const color = isInvertedColor ? "white" : "#002D63"
    return (
        <div className="d-flex flex-column justify-content-evenly align-items-center gameListAttending">
            {showAttDesc && <div className="gameListAttending-description bg-primary">JDU</div> }
            <div className="gameListAttending-statusIcon">
                {
                    role == AthleteRole.Player ? <span><PlayerIcon color={color} height={showAttDesc ? 30: 50}/></span>
                    : role == AthleteRole.Goalie ? <span><GoalieIcon color={color} height={showAttDesc ? 30: 50}/></span>
                    : role == AthleteRole.Referee ? <span><RefereeIcon color={color} height={showAttDesc ? 30: 50}/></span>
                    : <span></span>
                }
            </div>
            {
                showMoney &&
                (
                    role == AthleteRole.Player ? <div className="mt-1 fs-6">{game.est_price} Kč</div>
                    : role == AthleteRole.Goalie ? <div className="mt-1 text-success fs-6">+{game.goalie_renum} Kč</div>
                    : role == AthleteRole.Referee ? <div className="mt-1 text-success fs-6">+{game.referee_renum} Kč</div>
                    : <div></div>
                )
            }
        </div>
    )

} 

