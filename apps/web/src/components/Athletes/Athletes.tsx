import CircularProgress from "@mui/material/CircularProgress"
import axios from "axios"
import { fetchAthletes } from "puckee-common/api"
import { useAuth } from "puckee-common/auth"
import { Athlete, IAthlete } from "puckee-common/types"
import React, { useEffect } from "react"
import { useInView } from "react-intersection-observer"
// import LoremIpsum from "react-lorem-ipsum"
import { useInfiniteQuery } from "react-query"
import { ReactQueryDevtools } from 'react-query/devtools'
import { Header } from "../Header"
import VerticalMenu from "../VerticalMenu"
import { PlayerFilters } from "./AthleteFilters"
import { AthleteInList } from "./AthleteInList"

const Athletes : React.FC = () => {
    const auth = useAuth()
    const user = new Athlete().deserialize(auth.userData.athlete)
    const { ref, inView } = useInView()

    const {status, data, error, isFetching, isFetchingNextPage, isFetchingPreviousPage,
      fetchNextPage, fetchPreviousPage, hasNextPage, hasPreviousPage, refetch
    } = useInfiniteQuery(
      ['athletes', user.id], fetchAthletes,
      {
        getPreviousPageParam: firstPage => firstPage.previous_id ?? undefined,
        getNextPageParam: lastPage => lastPage.next_id ?? undefined,
      }
    )

    useEffect(() => {
        console.log("rerendered")
      })


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
                            <div className="titleRow">
                                <h5>Hráči</h5>
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
                                                {page.items.map((athlete : IAthlete) => (
                                                    <AthleteInList key={athlete.id} currentUser={user} athleteObj={athlete}/>
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
                                                        ? 'Načítám další hráče...'
                                                        // ? <Loading/>
                                                        : hasNextPage
                                                        ? 'Načti další hráče'
                                                        : 'Žádní další hráči'}
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
                        <div className="rightContentColumn no-btn">
                            <PlayerFilters/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Athletes