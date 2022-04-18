import { IGame } from "puckee-common/types"
import React from "react"

interface GameDetailBasicInfoProps {
    game: IGame
}

export default function GameDetailAttendance ({ game }: GameDetailBasicInfoProps)
{
    return (
        <div className="content-row gameDetail-attendees">
            <div className="content-inner-row heading">
                Účastníci
            </div>
            <div className="content-inner-row data gameDetail-chatAttendeesContent">
                {/* Players row */}
                <div className="d-flex flex-row justify-content-between gameDetail-attendance-players">
                    {/* Column containing large player icon */}
                    <div className="d-flex flex-column justify-content-center">
                        <div>icon</div>
                        <div>count</div>
                    </div>
                    {/* Column containing players */}
                    <div className="d-flex flex-column justify-content-start">
                        registrovani hraci
                    </div>
                </div>
                {/* Goalies and referees row */}
                <div className="d-flex flex-row justify-content-between">
                    {/* Column containing large goalie icon */}
                    <div className="d-flex flex-column justify-content-center">
                        <div>icon</div>
                        <div>goalie</div>
                    </div>
                    {/* Column containing goalies */}
                    <div className="d-flex flex-column justify-content-start">
                        golmani
                    </div>
                    {/* Column containing large referee icon */}
                    <div className="d-flex flex-column justify-content-center">
                        <div>icon</div>
                        <div>referee</div>
                    </div>
                    {/* Column containing goalies */}
                    <div className="d-flex flex-column justify-content-start">
                        rozhodci
                    </div>
                </div>
            </div>
        </div>
    )
}