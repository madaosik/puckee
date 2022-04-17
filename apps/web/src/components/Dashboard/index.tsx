import React from "react"
import { MightInterestYou } from "./MightInterestYou"
import { MyNearestGames } from "./MyNearestGames"
import { MyCalendar } from "./MyCalendar"
import { Header } from "../Header"
import VerticalMenu from "../VerticalMenu"

const Dashboard : React.FC = () => {
    return (
        <>
        <Header />
        <VerticalMenu/>
        <div className="main-content">
            <div className="content-container">
                <div className="content-row dashboard-first">
                    <div className="dashboard-myNearestGames">
                        <MyNearestGames/>
                    </div>
                    <div className="dashboard-calendar">
                        <MyCalendar/>
                    </div>
                </div>
                <div className="content-row dashboard-second">
                    <MightInterestYou/>
                </div>
            </div>
        </div>
        </>
    )
}

export default Dashboard