import axios from "axios"
import { API_BASE } from "puckee-common/api"
import { useAppSelector } from "puckee-common/redux"
import { Athlete, IAthlete } from "puckee-common/types"
import React, { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import LoremIpsum from "react-lorem-ipsum"
import { useInfiniteQuery } from "react-query"
import { ReactQueryDevtools } from 'react-query/devtools'
import Button from "../Button"
import { PlayerFilters } from "./AthleteFilters"
import { AthleteInList } from "./AthleteInList"

const Players : React.FC = () => {
    const { userData } = useAppSelector((state) => state.auth)
    const user = new Athlete().deserialize(userData)

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
      refetch
    } = useInfiniteQuery(
      'athletes',
      async ({ pageParam = 1 }) => {
        const res = await axios.get(`${API_BASE}/athlete?page_id=${pageParam}&per_page=10&requesting_id=${user.id}`)
        console.log(res.data)
        return res.data
      },
      {
        getPreviousPageParam: firstPage => firstPage.previous_id ?? undefined,
        getNextPageParam: lastPage => lastPage.next_id ?? undefined,
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
                    <div className="titleRow">
                        <h5>Hráči</h5>
                    </div>
                    <div className="content">
                            {status === 'loading' || status === 'idle' ? (
                                <p>Loading...</p>
                            ) : status === 'error' ? (
                                <span>Error: {error.message}</span>
                            ) : (
                                <>
                                {data.pages.map(page => (
                                    <React.Fragment key={page.next_id}>
                                        {page.data.map((athlete : IAthlete) => (
                                            <AthleteInList currentUser={user} athleteObj={athlete}/>
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
    )
}

export default Players