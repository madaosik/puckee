import CircularProgress from "@mui/material/CircularProgress"
import { useFetchGameByAthleteId, useFetchIceRinks } from "puckee-common/api"
import { useAuth } from "puckee-common/auth"
import { Athlete, IceRink, IGame, IIceRink } from "puckee-common/types"
import React from "react"
import { ReactQueryDevtools } from 'react-query/devtools'
import GameInList from "../Games/GameInList"
import DashboardNearestGame from "./DashboardNearestGame"

export default function MyNearestGames()
{
    const auth = useAuth()
    const currentUser = new Athlete().deserialize(auth.userData.athlete)

    var rinks : IceRink[] | undefined = undefined
    const { error: errorRinks, data: dataRinks, isSuccess: isSuccessRinks } = useFetchIceRinks()

    if (isSuccessRinks) {
        console.log(dataRinks)
        rinks = (dataRinks as IIceRink[]).map((r : IIceRink) => (new IceRink().deserialize(r)))
    }
    if (errorRinks){
        console.log("Error fetching rinks: " + errorRinks.message)
    }

    const { isError: isGamesError, error: gamesError, isIdle, isSuccess: isLoadingGames, data: dataGames, isSuccess: isSuccessGames } = 
            useFetchGameByAthleteId(currentUser.id, 3, {enabled: !!dataRinks})
    
    return (
        <div className="content-inner-box">
            <div className="content-inner-row heading">
                <h4>Tvoje nejbližší utkání</h4>
            </div>
            <div className="content-inner-row data d-flex">
                {   isSuccessGames ?
                    (
                        <div className="d-flex flex-column flex-1 justify-content-between">
                            {dataGames.map(g => (
                                <React.Fragment>
                                    <div className="flex-1">
                                        <DashboardNearestGame key={g.id} icerink={rinks!.find(r => r.id == g.location_id)} user={currentUser} gameObj={g}/>
                                    </div>
                                </React.Fragment>
                                ))
                            }
                         </div>
                    )
                    :
                    isLoadingGames ? (
                    <div className="d-flex flex-column flex-1 justify-content-center align-items-center h-100">
                        <CircularProgress size={50}/>
                    </div>
                    ) 
                    : 
                    isGamesError ? <span>Error: {error.message}</span>
                    : null
                }
            </div>
            <ReactQueryDevtools initialIsOpen />
        </div>
    )
}
