import { Athlete, AthleteRole, Game, IGame } from "puckee-common/types"
import React from "react"
import { GoalieIcon, PlayerIcon, RefereeIcon } from "../../Icons"

interface FolloweesInGameProps {
    user: Athlete
    gameObj: IGame
}

export default function FolloweesInGame( {user, gameObj} : FolloweesInGameProps)
{
    const game = new Game().deserialize(gameObj)
    const followedOrganizers = game.findFollowed(user.id, AthleteRole.Organizer).map(a => `${a.name} ${a.surname}`)
    const followedPlayers = game.findFollowed(user.id, AthleteRole.Player).map(a => `${a.name} ${a.surname}`)
    const followedGoalies = game.findFollowed(user.id, AthleteRole.Goalie).map(a => `${a.name} ${a.surname}`)
    const followedReferees = game.findFollowed(user.id, AthleteRole.Referee).map(a => `${a.name} ${a.surname}`)
    
    const followedParticipantsLen = followedPlayers.length + followedGoalies.length + followedReferees.length 

    const renderParticipants = (role: AthleteRole) => {
        var participantsStr: string = ""
        if (role == AthleteRole.Player) participantsStr = followedPlayers.join(", ")
        else if (role == AthleteRole.Goalie) participantsStr = followedGoalies.join(", ")
        else participantsStr = followedReferees.join(", ")

        return (
            <div className="d-flex flex-row justify-content-start fw-bolder">
                <div>{participantsStr}</div>
                <div className="ms-2 me-2">
                    { 
                        role == AthleteRole.Player ? <PlayerIcon height={20} color={"black"}/>
                        :
                        role == AthleteRole.Goalie ? <GoalieIcon height={20} color={"black"}/>
                        :
                        <RefereeIcon height={20} color={"black"}/>
                    }
                </div> 
            </div>
        )
    }

    return (
        <div className="d-flex flex-column justify-content-between ms-2 mt-2 text-dark">
            <div className="d-flex flex-row justify-content-start flex-wrap">
                { 
                    followedParticipantsLen == 0 ?
                    <></>
                    :
                    followedParticipantsLen > 0 &&
                    (
                        <div className="d-flex flex-row justify-content start">
                            {followedPlayers.length > 0 && renderParticipants(AthleteRole.Player)}
                            {followedGoalies.length > 0 && renderParticipants(AthleteRole.Goalie)}
                            {followedReferees.length > 0 && renderParticipants(AthleteRole.Referee)}
                            <span className="fw-normal"> se účastní. </span>
                        </div>
                    )
                }
            </div>
            <div>
                { 
                    followedOrganizers.length == 0 ?
                    <></>
                    :
                    followedOrganizers.length == 1 ?
                    <div><span className="fw-bolder">{followedOrganizers.join(", ")}</span> organizuje.</div>
                    :
                    <div><span className="fw-bolder">{followedOrganizers.join(", ")}</span> organizují.</div>
                }
            </div>
        </div>
    )
}