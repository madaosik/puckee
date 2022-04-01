import React from "react"
import Button from "../Button"
import { PlayerFilters } from "./PlayerFilters"

const Players : React.FC = () => {
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
                        <p>Výpis hráčů</p>
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