import { Game } from "puckee-common/types"
import React from "react"
import { GoalieIcon, PlayerIcon, RefereeIcon } from '../../../Icons'
import AthleteBadge from "../../AthleteBadge"

interface GameDetailBasicInfoProps {
    game: Game
}

export default function GameDetailAttendance ({ game }: GameDetailBasicInfoProps)
{   
    const renderUnRegisteredPlayers = () => {
        return <></>
    }

    return (
        <div className="content-row gameDetail-attendees">
            <div className="content-inner-row heading">
                Účastníci
            </div>
            <div className="content-inner-row data gameDetail-attendeesContent">
                {/* Players row */}
                <div className="d-flex flex-row justify-content-between gameDetail-attendance-players">
                    {/* Column containing large player icon */}
                    <div className="d-flex flex-column justify-content-center ms-2">
                        <div className="d-flex flex-row justify-content-center"><PlayerIcon color="#A9A9A9" height={70}/></div>
                        <div className="gameDetail-attendeeCntDesc">{game.players.length}/{game.exp_players_cnt}</div>
                    </div>
                    {/* Column containing players */}
                    <div className="d-flex flex-column justify-content-start ps-4 gameDetail-players-box">
                        <div className="d-flex flex-row flex-wrap">
                            <div className="d-flex flex-row athleteBadge-wrapper align-items-center mt-2 me-2 athleteBadge-wrapper regNonRegLabel">Registrovaní: {game.players.length}</div>
                            { game.players.map(p => <div className="mb-2 me-2"><AthleteBadge registered={true} athlete={p}/></div>) }
                        </div>
                        <div className="d-flex flex-row flex-wrap mt-4">
                            <div className="d-flex flex-row athleteBadge-wrapper align-items-center mt-2 me-2 athleteBadge-wrapper regNonRegLabel">Neregistrovaní: {game.players.length}</div>
                            { game.players.map(p => <div className="mb-2 me-2"><AthleteBadge registered={false} athlete={p}/></div>) }
                        </div>
                    </div>
                </div>
                {/* Goalies and referees row */}
                <div className="d-flex flex-row mt-2 gameDetail-attendance-goaliesReferees">
                    <div className="d-flex flex-row justify-content-evenly gameDetail-goalieSection">
                        {/* Column containing large goalie icon */}
                        <div className="d-flex flex-column justify-content-center ms-2">
                            <div className="d-flex flex-row justify-content-center align-items-center"><GoalieIcon color="#A9A9A9" height={70}/></div>
                            <div className="gameDetail-attendeeCntDesc">{game.goalies.length}/{game.exp_goalies_cnt}</div>
                        </div>
                        {/* Column containing goalies */}
                        <div className="d-flex flex-column justify-content-start ps-4">
                            <div className="d-flex flex-column">
                                <div className="d-flex flex-row athleteBadge-wrapper align-items-center mt-2 me-2 athleteBadge-wrapper regNonRegLabel">Registrovaní: {game.goalies.length}</div>
                                { game.goalies.map(p => <div className="mb-2 me-2"><AthleteBadge registered={true} athlete={p}/></div>) }
                            </div>
                            <div className="d-flex flex-column mt-4">
                                <div className="d-flex flex-row athleteBadge-wrapper align-items-center mt-2 me-2 athleteBadge-wrapper regNonRegLabel">Neregistrovaní: {game.goalies.length}</div>
                                { game.goalies.map(p => <div className="mb-2 me-2"><AthleteBadge registered={false} athlete={p}/></div>) }
                            </div>
                        </div>
                    </div>
                    {/* Column containing large referee icon */}
                    <div className="d-flex flex-row justify-content-evenly gameDetail-refereeSection">
                        <div className="d-flex flex-column justify-content-center">
                            <div className="d-flex flex-row justify-content-center"><RefereeIcon color="#A9A9A9" height={60}/></div>
                            <div className="gameDetail-attendeeCntDesc">{game.referees.length}/{game.exp_referees_cnt}</div>
                        </div>
                        {/* Column containing referees */}
                        <div className="d-flex flex-column justify-content-start ps-4">
                            <div className="d-flex flex-column">
                                <div className="d-flex flex-row athleteBadge-wrapper align-items-center mt-2 me-2 athleteBadge-wrapper regNonRegLabel">Registrovaní: {game.referees.length}</div>
                                { game.referees.map(p => <AthleteBadge registered={true} athlete={p}/>) }
                            </div>
                            <div className="d-flex flex-column mt-4">
                                <div className="d-flex flex-row athleteBadge-wrapper align-items-center mt-2 me-2 athleteBadge-wrapper regNonRegLabel">Neregistrovaní: {game.referees.length}</div>
                                { game.referees.map(p => <AthleteBadge registered={false} athlete={p}/>) }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}