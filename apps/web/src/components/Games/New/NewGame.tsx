import React, { useEffect, useRef, useState } from "react"
import LoremIpsum from "react-lorem-ipsum"
import { FinancialEstimate } from "./FinancialEstimate"
import { AvailableGroups } from "./AvailableGroups"
import { RecentlyOrganizedGames } from "./RecentlyOrganizedGames"
import { Button, ErrorReport, FormTextArea } from "../../FormElements"
import { Link } from "react-router-dom"
import { SkillPucksSlider } from "../../SkillPucks/SkillPucksSlider"
import { Athlete, AthleteRole, Game, GameLocOption, IceRink, IIceRink } from "puckee-common/types"
import { useAppSelector } from "puckee-common/redux"
import makeAnimated from 'react-select/animated';
import Select, {ActionMeta} from 'react-select';
// import { gameLocOptions } from 'puckee-common/utils';
import { FormInput, InputLabel} from "../../FormElements"
import { startOfISOWeek } from "date-fns"
import { useAuth } from "puckee-common/auth"
import { Header } from "../../Header"
import VerticalMenu from "../../VerticalMenu"
import { useQuery } from "react-query"
import { fetchIceRinks } from "puckee-common/api"
import { Avatar } from "@mui/material"
import { stringAvatar } from "puckee-common/utils/avatar"
import AthleteBadge from "../../AthleteBadge"
import { GoalieIcon, PlayerIcon, RefereeIcon } from "../../../Icons"
import GameRoleAttendanceSummary from "../GameRoleAttendanceSummary"
import {NewGamePlayers, NewGameGoalies, NewGameReferees} from "./Attendance"

class NewGameFormError {
    title: React.ReactNode
    startTime: React.ReactNode
    endTime: React.ReactNode
    constructor() {
        this.title = <ErrorReport/>
        this.startTime = <ErrorReport/>
        this.endTime = <ErrorReport/>
    }
}
// interface NewGameProps {
//     gameTitleCb: (title: JSX.Element) => void
// }

const NewGame  = () => {
    const { error: errorRinks , data: dataRinks, isSuccess: isSuccessRinks } = useQuery("icerink", fetchIceRinks);

    if (errorRinks) {
        console.log("Error fetching rinks: " + errorRinks.message)
    } 
    const auth = useAuth()

    const user = new Athlete().deserialize(auth.userData.athlete)
    const [game, setGame] = useState(new Game(user))

    const [errors, setErrors] = useState(new NewGameFormError())

    const [headerTitle, setHeaderTitle] = useState("Nové utkání")
    const [gameTitle, setGameTitle] = useState(game.name)
    const [remarks, setRemarks] = useState(game.remarks)
    const [organizers, setOrganizers] = useState<Athlete[]>([user])
    const [privateGame, setPrivateGame] = useState<boolean>(game.is_private)

    var locOptions: GameLocOption[] | undefined = undefined
    const [selectedLoc, setSelectedLoc] = useState<GameLocOption[] | unknown>([])
    const [gameDate, setGameDate] = useState(game.date.toISOString().substring(0,10))
    const [pitchPrice, setPitchPrice] = useState("0")
    const [otherCosts, setOtherCosts] = useState("0")
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")

    const [expPlayers, setExpPlayers] = useState(game.exp_players_cnt.toString())
    const [expGoalies, setExpGoalies] = useState(game.exp_goalies_cnt.toString())
    const [expReferees, setExpReferees] = useState(game.exp_referees_cnt.toString())
    const [expPrice, setExpPrice] = useState("250")

    const [goalieRenum, setGoalieRenum] = useState(game.goalie_renum.toString())
    const [refRenum, setRefRenum] = useState(game.referee_renum.toString())

    const [regPlayers, setRegPlayers] = useState<Athlete[]>([])
    const [nonRegPlayers, setNonRegPlayers] = useState<Athlete[]>([])

    const [regGoalies, setRegGoalies] = useState<Athlete[]>([])
    const [nonRegGoalies, setNonRegGoalies] = useState<Athlete[]>([])

    const [regReferees, setRegReferees] = useState<Athlete[]>([])
    const [nonRegReferees, setNonRegReferees] = useState<Athlete[]>([])

    var errorsToShow = new NewGameFormError();
    
    if(isSuccessRinks) {
        const rinksArray = (dataRinks as IIceRink[]).map((r : IIceRink) => (new IceRink().deserialize(r)))
        locOptions = rinksArray.map(r => r.generateLocOption()) 
    }

    // useEffect(() => {
    //     window.scrollTo(0, 0)
    //   },[errorsToShow])

    const handleSelectionUpdate = (option: readonly GameLocOption[] | unknown, actionMeta: ActionMeta<GameLocOption>) =>  { 
        setSelectedLoc(option)
        setPitchPrice(option.price_per_hour)
    }
    const [skillIndex, setSkillIndex] = useState<number>(game.exp_skill)

    const updateSkillCb = (newValue: number) => setSkillIndex(newValue)
    const updateGameTitle = (value: string) => {
        setGameTitle(value)
        value != "" ? setHeaderTitle(value) : setHeaderTitle("Nové utkání")
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
    
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        

        if (gameTitle==="") {
            errorsToShow.title = <ErrorReport msg="Zadej název utkání!"/>
        } 
        
        if (startTime === "") {
            errorsToShow.startTime = <ErrorReport msg="Kdy budete začínat?"/>
        }

        if (endTime === "") {
            errorsToShow.endTime = <ErrorReport msg="Kdy budete končit?"/>
        }
        
        setErrors(errorsToShow)

    }

    const newGameHeader = () => {
        return <>{headerTitle}</>
    }
    return (
        <>
            <Header headerContent={newGameHeader()} />
            <VerticalMenu/>
            <div className="main-content">
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
                                                    onChange={(e: React.FormEvent<HTMLInputElement>) => updateGameTitle(e.currentTarget.value)}
                                                    type="text" value={gameTitle}/>
                                                {errors.title}
                                            </div>
                                            <div style={{ flex: '1 0 auto' }}>
                                                <InputLabel content="Organizátoři"/>
                                                <AthleteBadge athlete={user} registered={true} />
                                            </div>
                                            {/* <div style={{ flex: '1 0 auto' }}>
                                                <InputLabel content="Soukromé utkání"/>
                                            </div> */}
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
                                                            <FormInput type="number" min="0" value={pitchPrice} className="content-right"
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
                                                            <FormInput type="number" min="0" value={otherCosts} className="content-right"
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
                                                        {errors.startTime}
                                                    </div>
                                                </div>
                                                <div className="newGame-basicInfo-row detailed input">
                                                    <div className="form-input-flex">
                                                        <InputLabel content="Čas konce"/>  
                                                        <FormInput 
                                                            onChange={(e: React.FormEvent<HTMLInputElement>) => updateEndTime(e.currentTarget.value)}
                                                            type="time" value={endTime} step="600"/>
                                                        {errors.endTime}
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
                                                        {/* <InputLabel content="H"/>  */}
                                                        <div><PlayerIcon height={20}/></div>
                                                        <FormInput 
                                                            onChange={(e: React.FormEvent<HTMLInputElement>) => setExpPlayers(e.currentTarget.value)}
                                                            type="number" min="0" value={expPlayers} className="short content-center"/>
                                                    </div>
                                                    <div className="form-input-flex horizontal">
                                                        {/* <InputLabel content="G"/>  */}
                                                        <GoalieIcon height={20}/>
                                                        <FormInput 
                                                            onChange={(e: React.FormEvent<HTMLInputElement>) => setExpGoalies(e.currentTarget.value)}
                                                            type="number" min="0" value={expGoalies} className="short content-center"/>
                                                    </div>
                                                    <div className="form-input-flex horizontal">
                                                        {/* <InputLabel content="R"/> */}
                                                        <RefereeIcon height={38}/> 
                                                        <FormInput 
                                                            onChange={(e: React.FormEvent<HTMLInputElement>) => setExpReferees(e.currentTarget.value)}
                                                            type="number" min="0" value={expReferees} className="short content-center"/>
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
                                                                <FormInput type="number" min="0" value={expPrice} className="content-right"
                                                                    onChange={(e: React.FormEvent<HTMLInputElement>) => setExpPrice(e.currentTarget.value)}/>
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
                                <NewGamePlayers regPlayers={regPlayers} setRegPlayersCb={setRegPlayers}
                                                nonRegPlayers={nonRegPlayers} setNonRegPlayersCb={setNonRegPlayers} expPlayersCnt={Number(expPlayers)}/>
                            </div>
                        </div>
                        <div className="newGame-helpers availableGroups side">
                            <AvailableGroups/>
                        </div>
                    </div>
                    {/* ------------------------------ */}
                    {/* GOALIES SECTION */}
                    <div className="content-row newGame-attendees goalies">
                        <div className="newGame-section main">
                            <div className="content-inner-row heading">
                                Brankáři
                            </div>
                            <div className="content-inner-row data">
                                <NewGameGoalies goalieRenum={goalieRenum} setGoalieRenumCb={setGoalieRenum} />
                            </div>
                        </div>
                    </div>
                    {/* ------------------------------ */}
                    {/* REFEREES SECTION */}
                    <div className="content-row newGame-attendees referees">
                        <div className="newGame-section main">
                            <div className="content-inner-row heading">
                                Rozhodčí
                            </div>
                            <div className="content-inner-row data">
                                <NewGameReferees refereeRenum={refRenum} setRefereeRenumCb={setRefRenum}/>
                            </div>
                        </div>
                    </div>
                    {/* ------------------------------ */}
                    <div className="content-row newGame-addGame">
                        <div className="addGame-buttonPart main">
                            {/* <Link to={"/games"}> */}
                                <Button onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSubmit(e)} className="btn btn-primary btn-lg" caption="Vytvořit utkání"/>
                            {/* </Link> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewGame


