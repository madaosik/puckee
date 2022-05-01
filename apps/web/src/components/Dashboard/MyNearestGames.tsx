import CircularProgress from "@mui/material/CircularProgress"
import { useFetchGameByAthleteId, useFetchIceRinks } from "puckee-common/api"
import { useAuth } from "puckee-common/auth"
import { Athlete, IceRink, IGame, IIceRink } from "puckee-common/types"
import React, { useEffect, useState } from "react"
import { ReactQueryDevtools } from 'react-query/devtools'
import { Link } from "react-router-dom"
import GameInList from "../Games/GameInList"
import NearestGame from "./NearestGame"

interface MyNearestGamesProps {
    icerinks: IceRink[] | undefined
    user: Athlete
}

export default function MyNearestGames( { user, icerinks } : MyNearestGamesProps)
{
    // const [games, setGames] = useState<IGame[]>([])
    const { status, isError, error, isIdle, isFetching, data} = useFetchGameByAthleteId(user.id, 3, {enabled: true})
    // console.log(games)
    const renderGames = () => {
        if (data.length > 0) {
            return data.map((g: IGame) => (
                <React.Fragment key={'nearest-' + g.id}>
                    <>
                        <NearestGame icerink={icerinks!.find(r => r.id == g.location_id)} user={user} gameObj={g}/>
                    </>
                </React.Fragment>
                )
            )
        }
        else {
            return (
                <div className="d-flex flex-column justify-content-center align-items-center flex-1 w-100">
                    <div>Nejsi přihlášen na žádné utkání!</div>
                    <div>Přejít na <Link to="/games">přehled utkání</Link>.</div>
                </div>
            )
        }
    }



    return (
        <div className="content-inner-box">
            <div className="content-inner-row heading">
                <h4>Tvoje nejbližší utkání</h4>
            </div>
            <div className="content-inner-row data d-flex">
                {   
                    status === 'loading' || status === 'idle' ? 
                        (
                            <div className="d-flex flex-column h-100 justify-content-center align-items-center">
                                <CircularProgress size={60}/>
                            </div>
                        )
                    :
                    isFetching ?
                    (
                        <div className="d-flex flex-column h-100 justify-content-center align-items-center">
                            <CircularProgress size={60}/>
                        </div>
                    )
                    :
                    status === 'error' ? 
                        <span>Error: { error.message }</span>
                    :
                    (
                        <div className="d-flex flex-column flex-1 justify-content-center mh-100">
                            { renderGames() }
                         </div>
                    )
                }
            </div>
            <ReactQueryDevtools initialIsOpen />
        </div>
    )
}
