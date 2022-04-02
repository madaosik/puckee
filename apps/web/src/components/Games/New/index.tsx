import React from "react"
import LoremIpsum from "react-lorem-ipsum"
import { FinancialEstimate } from "./FinancialEstimate"
import { AvailableGroups } from "./AvailableGroups"
import { RecentlyOrganizedGames } from "./RecentlyOrganizedGames"
import Button from "../../Button"
import { Link } from "react-router-dom"

const NewGame : React.FC = () => {
    return (
        <div className="content-container">
            <div className="content-row newGame-basics">
                <div className="newGame-section main">
                    <div className="content-inner-row heading">
                        Základní údaje
                    </div>
                    <div className="content-inner-row data">
                       <LoremIpsum p={3}/>
                    </div>
                </div>
                <div className="newGame-helpers side">
                    <div className="newGame-recentlyOrganized">
                        <RecentlyOrganizedGames/>
                    </div>
                    <div className="newGame-financialEstimate">
                        <FinancialEstimate/>
                    </div>
                </div>
            </div>
            <div className="content-row newGame-attendees">
                <div className="newGame-section main">
                    <div className="content-inner-row heading">
                        Hráči v poli
                    </div>
                    <div className="content-inner-row data">
                       <LoremIpsum p={2}/>
                    </div>
                </div>
                <div className="newGame-helpers availableGroups side">
                    <AvailableGroups/>
                </div>
            </div>
            <div className="content-row newGame-attendees goalies">
                <div className="newGame-section main">
                    <div className="content-inner-row heading">
                        Brankáři
                    </div>
                    <div className="content-inner-row data">
                       <LoremIpsum p={1}/>
                    </div>
                </div>
            </div>
            <div className="content-row newGame-attendees referees">
                <div className="newGame-section main">
                    <div className="content-inner-row heading">
                        Rozhodčí
                    </div>
                    <div className="content-inner-row data">
                       <LoremIpsum p={1}/>
                    </div>
                </div>
            </div>
            <div className="content-row newGame-addGame">
                <div className="addGame-buttonPart main">
                    <Link to={"/games"}>
                        <Button className="btn btn-primary btn-lg" type="submit" caption="Vytvořit utkání"/>
                    </Link>
                </div>
            </div>
        </div> 
    )
}

export default NewGame