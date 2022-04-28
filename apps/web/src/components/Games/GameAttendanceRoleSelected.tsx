import { AthleteRole } from "puckee-common/types"
import React from "react"
import { GoalieIcon, PlayerIcon, RefereeIcon } from "../../Icons"

interface GameAttendanceRoleSelectedProps {
    role: AthleteRole
    isInvertedColor: boolean
    // selectToggle: (toggle: boolean) => void
}

// export const GameAttendanceRoleSelected = ( { role, selectToggle} : GameAttendanceRoleSelectedProps) => {
    // return (
    //     <div className="gameListAttending">
    //         <div className="gameListAttending-description" onClick={() => selectToggle(true)}>JDU</div>
    //         <div className="gameListAttending-statusIcon">
    //             {
    //                 role == AthleteRole.Player ? <span onClick={() => selectToggle(true)}>Hráč</span>
    //                 : role == AthleteRole.Goalie ? <span onClick={() => selectToggle(true)}>Brankář</span>
    //                 : role == AthleteRole.Referee ? <span onClick={() => selectToggle(true)}>Rozhodčí</span>
    //                 : <span></span>
    //             }
    //         </div>
    //     </div>
    // )
export const GameAttendanceRoleSelected = ( { role, isInvertedColor } : GameAttendanceRoleSelectedProps) => {
    const color = isInvertedColor ? "white" : "#002D63"
    return (
        <div className="gameListAttending">
            <div className="gameListAttending-description">JDU</div>
            <div className="gameListAttending-statusIcon">
                {
                    role == AthleteRole.Player ? <span><PlayerIcon color={color} height={30}/></span>
                    : role == AthleteRole.Goalie ? <span><GoalieIcon color={color} height={30}/></span>
                    : role == AthleteRole.Referee ? <span><RefereeIcon color={color} height={30}/></span>
                    : <span></span>
                }
            </div>
        </div>
    )

} 

