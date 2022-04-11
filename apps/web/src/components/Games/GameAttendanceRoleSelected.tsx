import { AthleteRole } from "puckee-common/types"

interface GameAttendanceRoleSelectedProps {
    role: AthleteRole
    selectTrigger: (toggle: boolean) => void
}

export const GameAttendanceRoleSelected = ( { role, selectTrigger} : GameAttendanceRoleSelectedProps) => {

    return (
        <div className="gameListAttending">
            <div className="gameListAttending-description" onClick={() => selectTrigger(true)}>JDU</div>
            <div className="gameListAttending-statusIcon">
                {
                    role == AthleteRole.Player ? <span onClick={() => selectTrigger(true)}>Hráč</span>
                    : role == AthleteRole.Goalie ? <span onClick={() => selectTrigger(true)}>Brankář</span>
                    : role == AthleteRole.Referee ? <span onClick={() => selectTrigger(true)}>Rozhodčí</span>
                    : <span></span>
                }
            </div>
        </div>
    )

} 

