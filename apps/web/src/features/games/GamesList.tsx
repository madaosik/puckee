import React, { useEffect } from "react"
import { useAppSelector, useAppDispatch } from 'puckee-common/redux'
import { selectAllGames, fetchGames } from 'puckee-common/features/games'
// import { Button } from "../../components"
// import { signOut } from "../auth/authSlice"
import { GameExcerpt } from "./GameExcerpt"

import { Spinner } from '../../components/Spinner/Spinner'
import { fetchToken } from "../../utils/auth"

export const GamesList = () => {
    const dispatch = useAppDispatch()
    const games = useAppSelector(selectAllGames)
    // const [daySections, setDaySections] = useState([]);

    const gameStatus = useAppSelector(state => state.games.status)
    const error = useAppSelector(state => state.games.error)

    // const handleLogout = (e: React.FormEvent) => {
    //     e.preventDefault()
    //     dispatch(signOut())
    // }

    useEffect(() => {
        if (gameStatus === 'idle') {
            dispatch(fetchGames(fetchToken()))
        }
    }, [gameStatus, dispatch])
    
    // const getSections = () => {
    //     const days = games
    //         .map(game => new Date(game.start))
    //         .map(date => date.toLocaleDateString('cs-cz'));

    //     const uniqueDays = new Set(days);

    //     uniqueDays.forEach( (dayDate) => {
    //         const section = {
    //             date: dayDate,
    //             games: games.filter(game => new Date(game.start).toLocaleDateString('cs-cz') === dayDate)
    //         };
    //         daySections.push(section);
    //     })
    //     return daySections;
    //     // console.log(daySections);
    //     // days.forEach((d) => {
    //     //     // console.log(d.toLocaleDateString())
    //     //     console.log(d.getDate() + ' ' + d.getMonth());
    //     // });
    // }

    let content

    if (gameStatus === 'loading') {
        content = <Spinner text="Načítám..." />
    } else if (gameStatus === 'succeeded') {
        // setDaySections(getSections());
        // setDaySections(filterDaysSections(games));
        // console.log(daySections);
        // console.log(daySections);
        content = games.map(game => (
            <GameExcerpt key={game.id} { ...game } />
        ))
    } else if (gameStatus === 'failed') {
        content = <div>{error}</div>
    }

    return (
        <section className="games-list">
            {/* <div><Button onClick={handleLogout} name="Sign Out"/></div> */}
            {/* <h2 className="mainpage-heading">Plánovaná utkání</h2> */}
            {content}
        </section>
    )
}