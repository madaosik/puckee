import { fetchGameById } from "puckee-common/api/game"
import React from "react"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { Loading } from "../../../pages"
import { Header } from "../../Header"
import VerticalMenu from "../../VerticalMenu"

type GameParams = {
    id: string
}

export default function GameDetail ()
{
    const { id } = useParams<GameParams>()
    const { error, isError, isIdle, isLoading, data, isSuccess } = useQuery(["game", id], () => fetchGameById(id!));
    
    // if(isSuccess) {
    //     const game = new Game().deserialize(data)
    // }
    const renderHeader = () => isSuccess ? <Header headerContent={<>{data.name}</>} /> : <Header /> 
    const renderContent = () => {
        if (isLoading || isIdle) return <Loading/>
        if (isError) return <p>{error.message}</p>
        
        return (

            <>{data.id + ' ' + data.name}</>
        )

    }

    return (
        <>
            {renderHeader()}
            <VerticalMenu/>
            <div className="main-content">
                <div className="content-container">
                    {renderContent()}
                </div>
            </div>
        </>
    )
}