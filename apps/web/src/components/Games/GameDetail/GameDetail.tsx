import { fetchGameById } from "puckee-common/api/game"
import { useAuth } from "puckee-common/auth"
import { Athlete } from "puckee-common/types"
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
    const { error, isError, isIdle, isLoading, data, isSuccess } = useQuery(["game", id], () => fetchGameById(id!));
    const auth = useAuth()
    const currentUser = new Athlete().deserialize(auth.userData.athlete)
    
    useEffect(() => {
        window.scrollTo(0, 0)
      },[])

    const renderHeader = () => {
        if (isLoading || isIdle) return <Header />
        if (isSuccess) {
            return (
                <> 
                    <Header headerContent={data.name}
                        statusContent={
                        <div className="d-flex flex-row justify-content-center">
                            <HoverableGameAttendanceStatus
                                game={data}
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
        if (isLoading || isIdle) return <Loading/>
        if (isError) return <p>{error.message}</p>
        
        return (
            <div className="content-container">
                <GameDetailBasicInfo game={data}/>
                    <div className="d-flex flex-row justify-content-between">
                        <GameDetailAttendance/>
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