import React, { useEffect, useState } from "react"
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"
import { Button } from "../FormElements"
import { GameFilters } from "./GameFilters"
import { fetchGames, fetchIceRinks } from "puckee-common/api";
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery, useQuery } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Athlete, AthleteRole, IceRink, IGame, IIceRink } from "puckee-common/types";
import GameInList from "./GameInList";
import { Loading } from "../../pages";
import { Header } from "../Header";
import VerticalMenu from "../VerticalMenu";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuth } from "puckee-common/auth";
import { NOTIFICATION, useNotifications } from "puckee-common/context/NotificationsContext";


export default function Games ()
{
    const navigate = useNavigate()
    const auth = useAuth()
    const user = new Athlete().deserialize(auth.userData.athlete)
    const isOnlyUser = user.uniqueRole() == AthleteRole.User ? true: false
    const { setNotification } = useNotifications()

    var rinks : IceRink[] | undefined = undefined
    const { error: errorRinks, data: dataRinks, isSuccess: isSuccessRinks }
        = useQuery("icerink", fetchIceRinks);

    if (errorRinks) {
        console.log("Error fetching rinks: " + errorRinks.message)
    } 
    const { ref, inView } = useInView()
    const {status, data, error, isFetching, isFetchingNextPage, isFetchingPreviousPage,
        fetchNextPage, fetchPreviousPage, hasNextPage, hasPreviousPage, refetch
      } = useInfiniteQuery(
        'game', fetchGames,
        {
          getPreviousPageParam: firstPage => firstPage.previous_id ?? undefined,
          getNextPageParam: lastPage => lastPage.next_id ?? undefined,
          enabled: !!dataRinks
        }
      )

    useEffect(() => {
        if (inView) {
          fetchNextPage()
        }
      }, [inView])


    if (isSuccessRinks) {
        rinks = (dataRinks as IIceRink[]).map((r : IIceRink) => (new IceRink().deserialize(r)))
    }

    const handleNewGameClick = () => {
        if (isOnlyUser) {
            setNotification({message: "Před vytvářením nového utkání dokončete, prosím, registraci v osobním profilu!", variant: NOTIFICATION.ALERT, timeout: 4000})
        } else {
            navigate("new")
        }
    }

    return (
            <>
                <Header />
                <VerticalMenu/>
                <div className="main-content">
                    <div className="content-container">
                        <div className="content-row searchBar">
                            {/* <p>Vyhledávací lišta</p> */}
                        </div>
                        <div className="content-row columns">
                            <div className="leftContentColumn">
                                <div className="titleRow games">
                                    <h5>Utkání</h5>
                                    <div>
                                        <Button caption={
                                            isFetchingPreviousPage
                                                ? 'Načítám starší utkání...'
                                                : hasPreviousPage
                                                ? 'Načíst starší utkání'
                                                : 'Všechna utkání zobrazena'
                                        }
                                        onClick={() => fetchPreviousPage()}
                                        disabled={!hasPreviousPage || isFetchingPreviousPage} 
                                        className={"btn btn-sm btn-outline-primary rounded"}
                                        />
                                    </div>
                                </div>
                                <div className="content">
                                    {status === 'loading' || status === 'idle' ? (
                                        <div className="d-flex flex-column flex-1 justify-content-center align-items-center h-100">
                                            <CircularProgress size={60}/>
                                        </div>
                                    ) : status === 'error' ? (
                                        <span>Error: {error.message}</span>
                                    ) : (
                                        <>
                                        {data.pages.map(page => (
                                            <React.Fragment key={page.next_id}>
                                                {page.items.map((game : IGame) => (
                                                    <GameInList key={game.id} currentUser={user} gameData={game} icerink={rinks!.find(r => r.id == game.location_id)}/>
                                                ))}
                                            </React.Fragment>
                                            ))}
                                            <div>
                                                <button
                                                    ref={ref}
                                                    onClick={() => fetchNextPage()}
                                                    disabled={!hasNextPage || isFetchingNextPage}
                                                    className={"btn btn-sm btn-outline-primary rounded"}
                                                    >
                                                    {isFetchingNextPage
                                                        ? 'Načítám další utkání...'
                                                        // ? <Loading/>
                                                        : hasNextPage
                                                        ? 'Načti další utkání'
                                                        : 'Žádná další budoucí utkání'}
                                                </button>
                                            </div>
                                            <div>
                                                {isFetching && !isFetchingNextPage
                                                ? 'Aktualizuji...'
                                                : null}
                                            </div>
                                        </>
                                    )}
                                    <hr />
                                    <ReactQueryDevtools initialIsOpen />
                                </div>
                            </div>
                            <div className="rightContentColumn with-btn">
                                <div className="addBtnSection" onClick={() => isOnlyUser && setNotification({message: `Pro vytvoření nového utkání je třeba dokončit registraci!`, variant: NOTIFICATION.ALERT, timeout: 4000})}>
                                    <Button className="btn btn-primary btn-lg" caption="Nové utkání" iconClass="bi bi-plus" 
                                        disabled={isOnlyUser ? true: false}
                                        onClick={ () => handleNewGameClick() }/>
                                </div>
                                <GameFilters/>
                            </div>
                        </div>
                    </div>
                </div>
            </>
    )
}
