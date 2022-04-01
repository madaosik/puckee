import React from "react"
import Button from "../Button"
import { GameFilters } from "./GameFilters"

const Games : React.FC = () => {
    return (
        // <div className="content-container">
        //     <div className="content-row searchBar">
        //         <p>Vyhledávací lišta</p>
        //     </div>
        //     <div className="content-row games-titleRow">
        //         <div className="games-titleRowPart">
        //             <h5>Utkání</h5>
        //         </div>
        //         <div className="games-buttonPart">
        //             <Button className="btn btn-primary" type="submit" caption="Nové utkání" iconClass="bi bi-plus"/>
        //         </div>
        //     </div>
        //     <div className="content-row games-listandFilters">
        //         <div className="results">
        //             <p>Výpis zápasů</p>
        //         </div>
        //         <div className="filters">
        //             <GameFilters/>
        //         </div>
        //     </div>
        // </div>


        <div className="content-container">
            <div className="content-row searchBar">
                <p>Vyhledávací lišta</p>
            </div>
            <div className="content-row columns">
                <div className="leftContentColumn">
                    <div className="titleRow">
                        <h5>Utkání</h5>
                    </div>
                    <div className="content">
                        <p>Výpis utkání</p>
                    </div>
                </div>
                <div className="rightContentColumn with-btn">
                    <div className="addBtnSection">
                        <Button className="btn btn-primary btn-lg" type="submit" caption="Nové utkání" iconClass="bi bi-plus"/>
                    </div>
                    <GameFilters/>
                </div>
            </div>
        </div>

    )
}

export default Games