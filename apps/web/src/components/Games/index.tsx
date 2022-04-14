import React, { useEffect } from "react"
import { Link, Redirect } from "react-router-dom"
import { Button } from "../FormElements"
import { GameFilters } from "./GameFilters"
import { LoremIpsum } from 'react-lorem-ipsum';
import history from "../../routes/history";
import { API_BASE } from "puckee-common/api";

import axios from 'axios'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery, useQuery } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { IGame } from "puckee-common/types";
import GameInList from "./GameInList";
import { Loading } from "../../pages";

const Games : React.FC = () => {
    const { error: errorRinks, data: dataRinks, isSuccess: isSuccessRinks }
        = useQuery("icerink", () => axios.get(`${API_BASE}/icerink` ).then((res) => res.data)
  );

  if (errorRinks) {
      console.log("Error fetching rinks: " + errorRinks.message)
  } 

    const { ref, inView } = useInView()

    const {
      status,
      data,
      error,
      isFetching,
      isFetchingNextPage,
      isFetchingPreviousPage,
      fetchNextPage,
      fetchPreviousPage,
      hasNextPage,
      hasPreviousPage,
    } = useInfiniteQuery(
      'games',
      async ({ pageParam = 5 }) => {
        const res = await axios.get(`${API_BASE}/game?page_id=` + pageParam + '&per_page=10')
        return res.data
      },
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
            <div className="content-container">
                <div className="content-row searchBar">
                    <p>Vyhledávací lišta</p>
                </div>
                <div className="content-row columns">
                    <div className="leftContentColumn">
                        <div className="titleRow games">
                            <h5>Utkání</h5>
                            <div>
                                        <button
                                        onClick={() => fetchPreviousPage()}
                                        disabled={!hasPreviousPage || isFetchingPreviousPage}
                                        >
                                        {isFetchingPreviousPage
                                            ? 'Načítám starší utkání...'
                                            : hasPreviousPage
                                            ? 'Načíst starší utkání'
                                            : 'Všechna utkání zobrazena'}
                                        </button>
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
                                        {page.data.map((game : IGame) => (
                                            <GameInList game={game} icerink={dataRinks[game.location_id]}/>
                                            // <p
                                            // style={{
                                            //     border: '1px solid gray',
                                            //     borderRadius: '5px',
                                            //     padding: '2rem 1rem',
                                            //     background: `hsla(${game.id * 30}, 60%, 80%, 1)`,
                                            // }}
                                            // key={game.id}
                                            // >
                                            // {game.name + ' date: ' + game.date}
                                            // {/* {game.date} */}
                                            // </p>
                                        ))}
                                    </React.Fragment>
                                    ))}
                                    <div>
                                        <button
                                            ref={ref}
                                            onClick={() => fetchNextPage()}
                                            disabled={!hasNextPage || isFetchingNextPage}
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
                            {/* <Link to="/about">
                                Go to another page
                            </Link> */}
                            <ReactQueryDevtools initialIsOpen />
                        </div>
                    </div>
                    <div className="rightContentColumn with-btn">
                        <div className="addBtnSection">
                            <Link to={"/games/new"}>
                                <Button className="btn btn-primary btn-lg" type="submit" caption="Nové utkání" iconClass="bi bi-plus"/>
                            </Link>
                        </div>
                        <GameFilters/>
                    </div>
                </div>
            </div>
    )
}

export default Games