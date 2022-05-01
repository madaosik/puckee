import React from "react"
import MightInterestYou from "./MightInterestYou"
import MyNearestGames from "./MyNearestGames"
import { MyCalendar } from "./MyCalendar"
import { Header } from "../Header"
import VerticalMenu from "../VerticalMenu"
import { Athlete, IceRink, IIceRink } from "puckee-common/types"
import { useFetchIceRinks } from "puckee-common/api"
import CircularProgress from "@mui/material/CircularProgress"
import { useAuth } from "puckee-common/auth"

export default function Dashboard()
{
    var rinks : IceRink[] | undefined = undefined
    const { status, isSuccess, isError, data } = useFetchIceRinks()
    const auth = useAuth()
    const currentUser = new Athlete().deserialize(auth.userData.athlete)
    
    if (isSuccess) {
        console.log(data)
        rinks = (data as IIceRink[]).map((r : IIceRink) => (new IceRink().deserialize(r)))
    }
    if (isError){
        console.log("Error fetching rinks: " + errorRinks.message)
    }

    return (
        <>
        <Header />
        <VerticalMenu/>
        <div className="main-content">
            <div className="content-container">
                <div className="content-row dashboard-first">
                    <div className="dashboard-myNearestGames">
                        {status === 'idle' || status === 'loading' ?
                            <div className="d-flex flex-column flex-1 justify-content-center align-items-center">
                                <CircularProgress size={60}/>
                            </div>
                            :
                            <MyNearestGames user={currentUser} icerinks={rinks}/>
                        }
                    </div>
                    <div className="dashboard-calendar">
                        <MyCalendar/>
                    </div>
                </div>
                <div className="content-row dashboard-second">
                        {status === 'idle' || status === 'loading' ?
                            <div className="d-flex flex-column flex-1 justify-content-center align-items-center">
                                <CircularProgress size={60}/>
                            </div>
                            :
                            <MightInterestYou user={currentUser} icerinks={rinks}/>
                        }
                </div>
            </div>
        </div>
        </>
    )
}
