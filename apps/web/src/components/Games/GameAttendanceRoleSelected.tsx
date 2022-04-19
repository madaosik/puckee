import { AthleteRole } from "puckee-common/types"
import React from "react"
import { GoalieIcon, PlayerIcon } from "../../Icons"

interface GameAttendanceRoleSelectedProps {
    role: AthleteRole
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
export const GameAttendanceRoleSelected = ( { role } : GameAttendanceRoleSelectedProps) => {
    return (
        <div className="gameListAttending">
            <div className="gameListAttending-description">JDU</div>
            <div className="gameListAttending-statusIcon">
                {
                    role == AthleteRole.Player ? <span><PlayerIcon color="black" height={20}/></span>
                    : role == AthleteRole.Goalie ? <span><GoalieIcon color="black" height={20}/></span>
                    : role == AthleteRole.Referee ? <span>Rozhodčí</span>
                    : <span></span>
                }
            </div>
        </div>
    )

} 

