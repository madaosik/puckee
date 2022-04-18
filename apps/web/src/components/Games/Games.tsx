import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "../FormElements"
import { GameFilters } from "./GameFilters"
import { fetchGames, fetchIceRinks } from "puckee-common/api";
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery, useQuery } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { IGame } from "puckee-common/types";
import GameInList from "./GameInList";
import { Loading } from "../../pages";
import { Header } from "../Header";
import VerticalMenu from "../VerticalMenu";

const Games : React.FC = () => {
    const { error: errorRinks, data: dataRinks, isSuccess: isSuccessRinks }
        = useQuery("icerink", fetchIceRinks);

  if (errorRinks) {
      console.log("Error fetching rinks: " + errorRinks.message)
  } 

    const { ref, inView } = useInView()
    const {status, data, error, isFetching, isFetchingNextPage, isFetchingPreviousPage,
        fetchNextPage, fetchPreviousPage, hasNextPage, hasPreviousPage, refetch
      } = useInfiniteQuery(
        'games', fetchGames,
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

    return (
            <>
                <Header />
                <VerticalMenu/>
                <div className="main-content">
                    <div className="content-container">
                        <div className="content-row searchBar">
                            <p>Vyhledávací lišta</p>
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
                                        // <p>N...</p>
                                        <Loading/>
                                    ) : status === 'error' ? (
                                        <span>Error: {error.message}</span>
                                    ) : (
                                        <>
                                        {data.pages.map(page => (
                                            <React.Fragment key={page.next_id}>
                                                {page.items.map((game : IGame) => (
                                                    <GameInList key={game.id} game={game} icerink={dataRinks[game.location_id]}/>
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
                                <div className="addBtnSection">
                                    <Link to="new">
                                        <Button className="btn btn-primary btn-lg" type="submit" caption="Nové utkání" iconClass="bi bi-plus"/>
                                    </Link>
                                </div>
                                <GameFilters/>
                            </div>
                        </div>
                    </div>
                </div>
            </>
    )
}

export default Games