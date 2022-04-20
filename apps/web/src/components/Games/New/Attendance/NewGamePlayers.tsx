import { Athlete, AthleteRole } from "puckee-common/types";
import React from "react";
import GameRoleAttendanceSummary from "../../GameRoleAttendanceSummary";

interface NewGamePlayersProps {
    regPlayers: Athlete[]
    nonRegPlayers: Athlete[]
    setRegPlayersCb : React.Dispatch<React.SetStateAction<Athlete[]>>
    setNonRegPlayersCb : React.Dispatch<React.SetStateAction<Athlete[]>>
    expPlayersCnt: number
}

export default function NewGamePlayers( {regPlayers, expPlayersCnt, setRegPlayersCb, setNonRegPlayersCb} : NewGamePlayersProps ) {
    return (
        <div className="newGame-players-rootBox">
            <div className="newGame-players-leftCol">
                <GameRoleAttendanceSummary role={AthleteRole.Player} cnt={regPlayers.length} totalCnt={expPlayersCnt}/>
            </div>
            <div className="newGame-players-rightCol">
                <div className="newGame-basicInfo-row detailed player-split-upper">
                    Registrovani hraci
                </div>
                <div className="newGame-basicInfo-row detailed player-split-below">
                    Neregistrovani hraci
                </div>
            </div>
        </div>
    )
}