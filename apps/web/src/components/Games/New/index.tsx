import React from "react"
import LoremIpsum from "react-lorem-ipsum"
import { FinancialEstimate } from "./FinancialEstimate"
import { AvailableGroups } from "./AvailableGroups"
import { RecentlyOrganizedGames } from "./RecentlyOrganizedGames"
import Button from "../../Button"
import { Link } from "react-router-dom"
import { SkillPucksSlider } from "../../SkillPucks/SkillPucksSlider"

const NewGame : React.FC = () => {
    return (
        <div className="content-container">
            {/* ------------------------------ */}
            {/* BASIC GAME INFO SECTION */}
            <div className="content-row newGame-basics">
                <div className="newGame-section main">
                    <div className="content-inner-row heading">
                        Základní údaje
                    </div>
                    <div className="content-inner-row data">
                        <div className="newGame-basicInfo-rootBox">
                            {/* ------------------------------ */}
                            {/* First row in basic info */}
                            <div className="newGame-basicInfo-row">
                                <div className="newGame-basicInfo-col">
                                    Titulek utkani, organizatori, soukrome utkani
                                </div>
                                <div className="newGame-basicInfo-col">
                                    Poznamky
                                </div>
                            </div>
                            {/* End of first row in basic info */}
                            {/* ------------------------------ */}
                            {/* ------------------------------ */}
                            {/* Second row in basic info */}
                            <div className="newGame-basicInfo-row">
                                <div className="newGame-basicInfo-col">
                                    <div className="newGame-basicInfo-row detailed">
                                        Misto
                                    </div>
                                    <div className="newGame-basicInfo-row detailed">
                                        Cena, ostatni naklady
                                    </div>
                                </div>
                                <div className="newGame-basicInfo-col">
                                    <div className="newGame-basicInfo-row detailed">
                                        Datum, opakovani utkani
                                    </div>
                                    <div className="newGame-basicInfo-row detailed">
                                        Zacatek, konec
                                    </div>
                                </div>
                            </div>
                            {/* End of second row in basic info */}
                            {/* ------------------------------ */}
                            {/* ------------------------------ */}
                            {/* Third row in basic info */}
                            <div className="newGame-basicInfo-row last pucks">
                                <div className="newGame-basicInfo-row last">
                                    <div className="newGame-basicInfo-col">
                                        Ocekavane pocty ucastniku
                                    </div>
                                    <div className="newGame-basicInfo-col">
                                        Odhadovana cena pro hrace
                                    </div>
                                </div>
                                <div className="newGame-basicInfo last pucks">
                                    <div className="newGame-basicInfo-pucksHeading">
                                        <div className="noFormLabel">Očekávaná úroveň</div>
                                    </div>
                                    <div className="newGame-basicInfo-pucks">
                                        <SkillPucksSlider currentSkill={0} skillLevelCb={function (value: number): void {
                                            throw new Error("Function not implemented.")
                                        } } puckSize={40} iconKey={""}/>
                                    </div>
                                </div>
                            </div>
                            {/* End of third row in basic info */}
                            {/* ------------------------------ */}
                        </div>
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
            {/* END OF BASIC GAME INFO SECTION */}
            {/* ------------------------------ */}
            {/* PLAYERS SECTION */}
            <div className="content-row newGame-attendees">
                <div className="newGame-section main">
                    <div className="content-inner-row heading">
                        Hráči v poli
                    </div>
                    <div className="content-inner-row data">
                       <div className="newGame-players-rootBox">
                            <div className="newGame-players-leftCol">
                                Ikona hracu a pocty
                            </div>
                            <div className="newGame-players-rightCol">
                                <div className="newGame-basicInfo-row detailed player-split-upper">
                                    Registrovani hraci
                                </div>
                                <div className="newGame-basicInfo-row detailed player-split-below">
                                    Neregistrovani hraci
                                </div>
                            </div>
                       </div>
                    </div>
                </div>
                <div className="newGame-helpers availableGroups side">
                    <AvailableGroups/>
                </div>
            </div>
            {/* END OF PLAYERS SECTION */}
            {/* ------------------------------ */}
            {/* GOALIES SECTION */}
            <div className="content-row newGame-attendees goalies">
                <div className="newGame-section main">
                    <div className="content-inner-row heading">
                        Brankáři
                    </div>
                    <div className="content-inner-row data">
                        <div className="newGame-players-rootBox">
                            <div className="newGame-players-leftCol">
                                Ikona brankaru a pocty
                            </div>
                            <div className="newGame-players-rightCol">
                                <div className="newGame-basicInfo-row detailed player-split-upper">
                                    Registrovani brankari
                                </div>
                                <div className="newGame-basicInfo-row detailed player-split-below">
                                    Neregistrovani brankari
                                </div>
                            </div>
                       </div>
                    </div>
                </div>
            </div>
            {/* END OF GOALIES SECTION */}
            {/* ------------------------------ */}
            {/* REFEREES SECTION */}
            <div className="content-row newGame-attendees referees">
                <div className="newGame-section main">
                    <div className="content-inner-row heading">
                        Rozhodčí
                    </div>
                    <div className="content-inner-row data">
                        <div className="newGame-players-rootBox">
                            <div className="newGame-players-leftCol">
                                Ikona rozhodcich a pocty
                            </div>
                            <div className="newGame-players-rightCol">
                                <div className="newGame-basicInfo-row detailed player-split-upper">
                                    Registrovani rozhodci
                                </div>
                                <div className="newGame-basicInfo-row detailed player-split-below">
                                    Neregistrovani rozhodci
                                </div>
                            </div>
                       </div>
                    </div>
                </div>
            </div>
            {/* END OF REFEREES SECTION */}
            {/* ------------------------------ */}
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