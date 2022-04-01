import React from "react"
import { MightInterestYou } from "./MightInterestYou"
import { MyNearestGames } from "./MyNearestGames"
import { MyCalendar } from "./MyCalendar"

const Dashboard : React.FC = () => {
    return (
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
    )
}

export default Dashboard