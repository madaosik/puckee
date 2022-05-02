import CircularProgress from "@mui/material/CircularProgress"
import { useFetchFolloweeGamesByAthleteId } from "puckee-common/api"
import { Athlete, IceRink, IGame } from "puckee-common/types"
import React from "react"
import LoremIpsum from "react-lorem-ipsum"
import { Link } from "react-router-dom"
import GameInList from "../Games/GameInList"
import FolloweesInGame from "./FolloweesInGame"

interface MightInterestYouProps {
    icerinks: IceRink[] | undefined
    user: Athlete
}

export default function MightInterestYou( {user, icerinks} : MightInterestYouProps)
{
    const { status, error, isSuccess, isFetching, data } = useFetchFolloweeGamesByAthleteId(user.id, 10, {enabled: true})
    const renderGames = () => {
        // User has not yet finalized registration process
        if (user.roles.length == 1) {
            return (
                <div className="d-flex flex-column justify-content-center align-items-center h-100 w-100">
                    <div>Po <Link to={"/profile"}>dokončení registrace</Link> zde uvidíš přehled utkání hráčů, které sleduješ.</div>
                </div>
            )
        }
        if (data.length > 0) {
            return data.map((g: IGame) => (
                <React.Fragment key={'mightInterest-' + g.id}>
                    <>
                        <FolloweesInGame key={'follGame-' + g.id} user={user} gameObj={g}/>
                        <GameInList currentUser={user} key={'mightInterest-' + g.id} icerink={icerinks!.find(r => r.id == g.location_id)} gameData={g}/>
                    </>
                </React.Fragment>
                )
            )
        }
        else {
            return (
                <div className="d-flex flex-column justify-content-center align-items-center flex-1 w-100">
                    <div>Tví sledovaní se neúčastní žádných utkání</div>
                </div>
            )
        }
    }


    return (
        <div className="content-inner-box">
            <div className="content-inner-row heading">
                <h4>Mohlo by Tě zajímat</h4>
            </div>
            <div className="content-inner-row data">
                {   
                    status === 'loading' || status === 'idle' ? 
                        (
                            <div className="d-flex flex-column h-100 justify-content-center align-items-center">
                                <CircularProgress size={60}/>
                            </div>
                        )
                    :
                    status === 'error' ? 
                        <span>Error: { error.message }</span>
                    :
                    isFetching ?
                    (
                        <div className="d-flex flex-column h-100 justify-content-center align-items-center">
                            <CircularProgress size={60}/>
                        </div>
                    )
                    :
                    (
                        <div className="d-flex flex-column flex-1 justify-content-center h-100">
                            { renderGames() }
                         </div>
                    )
                }
            </div>
        </div>
    )
}
