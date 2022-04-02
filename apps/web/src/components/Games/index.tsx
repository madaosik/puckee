import React from "react"
import { Link } from "react-router-dom"
import Button from "../Button"
import { GameFilters } from "./GameFilters"
import { LoremIpsum } from 'react-lorem-ipsum';


const Games : React.FC = () => {
    return (
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
                        <LoremIpsum p={7} />
                    </div>
                </div>
                <div className="rightContentColumn with-btn">
                    <div className="addBtnSection">
                        <Link to={"/games/new"}>
                            <Button className="btn btn-primary btn-lg" type="submit" caption="Nové utkání" iconClass="bi bi-plus"/>
                        </Link>
                    </div>
                    <GameFilters/>
                </div>
            </div>
        </div>

    )
}

export default Games