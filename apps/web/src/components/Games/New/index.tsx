import React, { useEffect, useRef, useState } from "react"
import LoremIpsum from "react-lorem-ipsum"
import { FinancialEstimate } from "./FinancialEstimate"
import { AvailableGroups } from "./AvailableGroups"
import { RecentlyOrganizedGames } from "./RecentlyOrganizedGames"
import { Button, FormTextArea } from "../../FormElements"
import { Link } from "react-router-dom"
import { SkillPucksSlider } from "../../SkillPucks/SkillPucksSlider"
import { Athlete, GameLocOption } from "puckee-common/types"
import { useAppSelector } from "puckee-common/redux"
import makeAnimated from 'react-select/animated';
import Select, {ActionMeta} from 'react-select';
import { gameLocOptions } from 'puckee-common/utils';
import { FormInput, InputLabel} from "../../FormElements"

const NewGame : React.FC = () => {
    const { userData } = useAppSelector((state) => state.auth);
    const user = new Athlete().deserialize(userData)
    
    const [gameTitle, setGameTitle] = useState("")
    const [remarks, setRemarks] = useState("")
    const [organizers, setPassword] = useState<Athlete[]>([user])
    const [privateGame, setPrivateGame] = useState<boolean>(false)

    const locOptions = gameLocOptions()
    const [selectedLoc, setSelectedLoc] = useState<GameLocOption[] | unknown>([])
    
    var curr = new Date();
    curr.setDate(curr.getDate() + 3);
    var currDate = curr.toISOString().substring(0,10);
    const [gameDate, setGameDate] = useState(currDate)
    const [pitchPrice, setPitchPrice] = useState("")
    const [otherCosts, setOtherCosts] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")

    const [estPlayers, setEstPlayers] = useState("")
    const [estGoalies, setEstGoalies] = useState("")
    const [estReferees, setEstReferees] = useState("")
    const [estPrice, setEstPrice] = useState("")
    const handleSelectionUpdate = (option: readonly GameLocOption[] | unknown, actionMeta: ActionMeta<GameLocOption>) => {
        setSelectedLoc(option)
        // selectedLocTemp = option
    }

    // const prevSkillIndex = useRef<number>()
    const [skillIndex, setSkillIndex] = useState<number>(0)

    // useEffect(() => {
        // prevSkillIndex.current = skillIndex
    // })

    // prevSkillIndex = prevSkillIndex.current



    const updateSkillCb = (newValue: number) => {
        setSkillIndex(newValue)
    }

    const updateEndTime = (value: string) => {
        //TODO Add one hour to the start time by default
        setEndTime(value)
    }

    const GameLocSelect = () => {
        return (
          <Select
            closeMenuOnSelect={true}
            components={makeAnimated()}
            defaultValue={selectedLoc}
            options={locOptions}
            placeholder="Vyber ledovou plochu"
            className="roleMultiSelect shadow"
            onChange={handleSelectionUpdate}
            noOptionsMessage={() => "Plocha nenalezena"}
          />
        );
      }
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    }


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
                                <div className="newGame-basicInfo-col flexStart">
                                    <div className="form-input-flex">
                                        <InputLabel content="Titulek utkání"/>
                                            <FormInput 
                                                onChange={(e: React.FormEvent<HTMLInputElement>) => setGameTitle(e.currentTarget.value)}
                                                type="text" value={gameTitle}/>
                                    </div>
                                    <div style={{ flex: '1 0 auto' }}>
                                        <InputLabel content="Organizátoři"/>
                                    </div>
                                    <div style={{ flex: '1 0 auto' }}>
                                        <InputLabel content="Soukromé utkání"/>
                                    </div>
                                </div>
                                <div className="newGame-basicInfo-col flexStart">
                                        <label style={{ color: 'darkgrey'}}>Poznámky</label>
                                        <FormTextArea
                                                onChange={(e: React.FormEvent<HTMLTextAreaElement>) => setRemarks(e.currentTarget.value)}
                                                value={remarks} />
                                </div>
                            </div>
                            {/* End of first row in basic info */}
                            {/* ------------------------------ */}
                            {/* ------------------------------ */}
                            {/* Second row in basic info */}
                            <div className="newGame-basicInfo-row">
                                <div className="newGame-basicInfo-col">
                                    <div className="newGame-basicInfo-row detailed">
                                        <div className="form-input-flex">
                                            <InputLabel content="Místo konání"/>
                                            <div className="form-input-input"><GameLocSelect/></div>
                                        </div>
                                    </div>
                                    <div className="newGame-basicInfo-row detailed">
                                        <div className="newGame-basicInfo-row detailed input">
                                            <div className="form-input-flex">
                                                <InputLabel content="Cena pronájmu ledu"/>
                                                <div className="input-group">
                                                    <FormInput type="number" min="0" value={pitchPrice}
                                                        onChange={(e: React.FormEvent<HTMLInputElement>) => setPitchPrice(e.currentTarget.value)}/>
                                                    <div className="input-group-append">
                                                        <span className="input-group-text shadow rounded">Kč/h</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="newGame-basicInfo-row detailed input">
                                            <div className="form-input-flex">
                                            <InputLabel content="Ostatní náklady"/>
                                                <div className="input-group">
                                                    <FormInput type="number" min="0" value={otherCosts}
                                                        onChange={(e: React.FormEvent<HTMLInputElement>) => setOtherCosts(e.currentTarget.value)}/>
                                                    <div className="input-group-append">
                                                        <span className="input-group-text shadow rounded">Kč</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="newGame-basicInfo-col">
                                    <div className="newGame-basicInfo-row detailed">
                                        <div className="newGame-basicInfo-row detailed input">
                                            <div className="form-input-flex">
                                                <InputLabel content="Datum"/>
                                                <FormInput 
                                                    onChange={(e: React.FormEvent<HTMLInputElement>) => setGameDate(e.currentTarget.value)}
                                                    type="date" value={gameDate}/>
                                            </div>
                                        </div>
                                        <div className="newGame-basicInfo-row detailed input">
                                            {/* opakovani utkani */}
                                        </div>
                                    </div>
                                    <div className="newGame-basicInfo-row detailed">
                                        <div className="newGame-basicInfo-row detailed input">
                                            <div className="form-input-flex">
                                                <InputLabel content="Čas začátku"/>   
                                                <FormInput 
                                                    onChange={(e: React.FormEvent<HTMLInputElement>) => setStartTime(e.currentTarget.value)}
                                                    type="time" value={startTime} step="600"/>
                                            </div>
                                        </div>
                                        <div className="newGame-basicInfo-row detailed input">
                                            <div className="form-input-flex">
                                                <InputLabel content="Čas konce"/>  
                                                <FormInput 
                                                    onChange={(e: React.FormEvent<HTMLInputElement>) => updateEndTime(e.currentTarget.value)}
                                                    type="time" value={endTime} step="600"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* End of second row in basic info */}
                            {/* ------------------------------ */}
                            {/* ------------------------------ */}
                            {/* Third row in basic info */}
                            <div className="newGame-basicInfo-row last">
                                <div className="newGame-basicInfo-row last subRow">
                                    <div className="newGame-basicInfo-col verticalEnd">
                                        <div className="newGame-basicInfo-estPlayerCntFlex">
                                            <div className="form-input-flex horizontal">
                                                <InputLabel content="H"/> 
                                                <FormInput 
                                                        onChange={(e: React.FormEvent<HTMLInputElement>) => setEstPlayers(e.currentTarget.value)}
                                                        type="number" min="0" value={estPlayers} className="short"/>
                                            </div>
                                            <div className="form-input-flex horizontal">
                                                <InputLabel content="G"/> 
                                                <FormInput 
                                                        onChange={(e: React.FormEvent<HTMLInputElement>) => setEstGoalies(e.currentTarget.value)}
                                                        type="number" min="0" value={estGoalies} className="short"/>
                                            </div>
                                            <div className="form-input-flex horizontal">
                                                <InputLabel content="R"/> 
                                                <FormInput 
                                                        onChange={(e: React.FormEvent<HTMLInputElement>) => setEstReferees(e.currentTarget.value)}
                                                        type="number" min="0" value={estReferees} className="short"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="newGame-basicInfo-col verticalEnd">
                                        <div className="flex-hCenter">
                                            <div className="reduceToHalfFlex">
                                                <div className="form-input-flex">
                                                    <div className="columnCenterFlex">
                                                        <InputLabel content="Odhadovaná cena/hráč"/>
                                                    </div>
                                                    <div className="input-group">
                                                        <FormInput type="number" min="0" value={estPrice}
                                                            onChange={(e: React.FormEvent<HTMLInputElement>) => setEstPrice(e.currentTarget.value)}/>
                                                        <div className="input-group-append">
                                                            <span className="input-group-text shadow rounded">Kč</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="newGame-basicInfo-row last subRow pucks">
                                    <div className="form-input-flex">
                                        <InputLabel content="Očekávaná úroveň"/> 
                                        {/* <div className="newGame-basicInfo-pucksHeading">
                                            <div className="noFormLabel"></div>
                                        </div> */}
                                        <div className="form-input-input">
                                            <SkillPucksSlider currentSkill={skillIndex} skillLevelCb={updateSkillCb} puckSize={40} iconKey={"new-game-skill"}/>
                                        </div>
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
                        <Button onClick={handleSubmit} className="btn btn-primary btn-lg" caption="Vytvořit utkání"/>
                    </Link>
                </div>
            </div>
        </div> 
    )
}

export default NewGame


