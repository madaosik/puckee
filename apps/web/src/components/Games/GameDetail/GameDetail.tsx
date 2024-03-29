import CircularProgress from "@mui/material/CircularProgress"
import { useFetchGameById } from "puckee-common/api/game"
import { useAuth } from "puckee-common/auth"
import { Athlete, Game } from "puckee-common/types"
import React, { useEffect } from "react"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { Loading } from "../../../pages"
import { Header } from "../../Header"
import VerticalMenu from "../../VerticalMenu"
import { HoverableGameAttendanceStatus } from "../HoverableGameAttendanceStatus"
import GameDetailAttendance from "./GameDetailAttendance"
import GameDetailBasicInfo from "./GameDetailBasicInfo"
import GameDetailChat from "./GameDetailChat"
import GameDetailEvaluation from "./GameDetailEvaluation"

type GameParams = {
    id: string
}

export default function GameDetail () {
    const { id } = useParams<GameParams>()
    const auth = useAuth()
    const currentUser = new Athlete().deserialize(auth.userData.athlete)
    const { error, isError, isIdle, isLoading, data, isSuccess } = useFetchGameById(id!, currentUser.id, true)
    // useEffect(() => {
    //     window.scrollTo(0, 0)
    //   },[])

    const renderHeader = () => {
        if (isLoading || isIdle) return <Header />
        if (isSuccess) {
            const game = new Game().deserialize(data)
            return (
                <> 
                    <Header headerContent={data.name}
                        statusContent={
                        <div className="d-flex flex-row justify-content-center">
                            <HoverableGameAttendanceStatus
                                showMoney={false}
                                showAttDesc={false}
                                isInvertedColor={true}
                                game={game}
                                user={currentUser}
                                classStr="gameDetail attendanceStatus"
                                joinBtnClass="btn btn-block btn-primary rounded"
                                // classStr="itemInList-col attendanceStatus"
                            />
                        </div>
                    }/>
                </>
            )
        }
    }

    const renderContent = () => {
        if (isLoading || isIdle) return (
            <div className="d-flex flex-column h-100 justify-content-center align-items-center">
                <CircularProgress size={60}/>
            </div>
            )
        if (isError) return <p>{error.message}</p>

        const game = new Game().deserialize(data)
        
        return (
            <div className="content-container">
                <GameDetailBasicInfo game={game}/>
                    <div className="d-flex flex-row justify-content-between">
                        <GameDetailAttendance game={game}/>
                        <GameDetailChat/>
                    </div>
                <GameDetailEvaluation/>
            </div>
        )
    }

    return (
        <>
            {renderHeader()}
            <VerticalMenu/>
            <div className="main-content">
                    {renderContent()}
            </div>
        </>
    )
}