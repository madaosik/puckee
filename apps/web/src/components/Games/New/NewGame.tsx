import React, { useState } from "react"
import { FinancialEstimate, AvailableGroups, RecentlyOrganizedGames } from "."
import { Button, ErrorReport, FormTextArea } from "../../FormElements"
import { SkillPucksSlider } from "../../SkillPucks/SkillPucksSlider"
import { Athlete, AthleteRole, Game, GameLocOption, IAnonymAthlete, IAthlete, IceRink, IIceRink } from "puckee-common/types"
import makeAnimated from 'react-select/animated';
import Select, { ActionMeta } from 'react-select';
import { FormInput, InputLabel } from "../../FormElements"
import { useAuth } from "puckee-common/auth"
import { Header } from "../../Header"
import VerticalMenu from "../../VerticalMenu"
import { useQuery } from "react-query"
import { fetchIceRinks } from "puckee-common/api"
import { AthleteBadge } from "../../AthleteBadge"
import { GoalieIcon, PlayerIcon, RefereeIcon } from "../../../Icons"
import { NewGameParticipants, NewGameGoalies, NewGameReferees, initPlayers } from "./Attendance"
import SnackbarAlert, { AlertReport, AlertType } from "../../SnackbarAlert"

class NewGameFormError {
    title: React.ReactNode
    startTime: React.ReactNode
    endTime: React.ReactNode
    constructor() {
        this.title = <ErrorReport />
        this.startTime = <ErrorReport />
        this.endTime = <ErrorReport />
    }
}

const NewGame = () => {
    const { error: errorRinks, data: dataRinks, isSuccess: isSuccessRinks } = useQuery("icerink", fetchIceRinks);

    if (errorRinks) {
        console.log("Error fetching rinks: " + errorRinks.message)
    }
    const auth = useAuth()

    const user = new Athlete().deserialize(auth.userData.athlete)
    const preferredRole = user.preferredRole()
    const [game, setGame] = useState(new Game(user))

    const [errors, setErrors] = useState(new NewGameFormError())

    const [headerTitle, setHeaderTitle] = useState("Nové utkání")
    const [gameTitle, setGameTitle] = useState(game.name)
    const [remarks, setRemarks] = useState(game.remarks)
    const [organizers, setOrganizers] = useState<IAthlete[]>([auth.userData.athlete])
    const [privateGame, setPrivateGame] = useState<boolean>(game.is_private)

    var locOptions: GameLocOption[] | undefined = undefined
    const [selectedLoc, setSelectedLoc] = useState<GameLocOption | unknown>(null)
    const [gameDate, setGameDate] = useState(game.date.toISOString().substring(0, 10))
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

    

    // const [regPlayers, setRegPlayers] = useState<IAthlete[]>((preferredRole == AthleteRole.Player) ? [auth.userData.athlete] : [])
    const [regPlayers, setRegPlayers] = useState<IAthlete[]>(initPlayers())
    const [nonRegPlayers, setNonRegPlayers] = useState<IAnonymAthlete[]>([])
    // console.log(nonRegPlayers)
    // console.log("rendering")
    const [regGoalies, setRegGoalies] = useState<IAthlete[]>((preferredRole == AthleteRole.Goalie) ? [auth.userData.athlete] : [])
    const [nonRegGoalies, setNonRegGoalies] = useState<IAnonymAthlete[]>([])

    const [regReferees, setRegReferees] = useState<IAthlete[]>((preferredRole == AthleteRole.Referee) ? [auth.userData.athlete] : [])
    const [nonRegReferees, setNonRegReferees] = useState<IAnonymAthlete[]>([])

    const [statusReport, setStatusReport] = useState<AlertReport | undefined>()
    var errorsToShow = new NewGameFormError();

    if (isSuccessRinks) {
        const rinksArray = (dataRinks as IIceRink[]).map((r: IIceRink) => (new IceRink().deserialize(r)))
        locOptions = rinksArray.map(r => r.generateLocOption())
    }

    // useEffect(() => {
    //     window.scrollTo(0, 0)
    //   },[errorsToShow])

    const handleSelectionUpdate = (option: readonly GameLocOption[] | unknown, actionMeta: ActionMeta<GameLocOption>) => {
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
        if (gameTitle === "") {
            errorsToShow.title = <ErrorReport msg="Zadej název utkání!" />
        }
        if (startTime === "") {
            errorsToShow.startTime = <ErrorReport msg="Kdy budete začínat?" />
        }
        if (endTime === "") {
            errorsToShow.endTime = <ErrorReport msg="Kdy budete končit?" />
        }
        setErrors(errorsToShow)
    }

    const newGameHeader = () => {
        return <>{headerTitle}</>
    }

    const isPlaceForRole = (role: AthleteRole) : boolean => {
        switch (role) {
            case (AthleteRole.Player):
                return (regPlayers.length + nonRegPlayers.length) < Number(expPlayers)
            case (AthleteRole.Goalie):
                return (regGoalies.length + nonRegGoalies.length) < Number(expGoalies)
            case (AthleteRole.Referee):
                return (regReferees.length + nonRegReferees.length) < Number(expReferees)
            default:
                throw new Error("Unexpected athlete role has been provided!")
        }
    }

    const addRegPlayer = (athlete: IAthlete) => {
        // TODO check if player can be added (enough free places)
        if(isPlaceForRole(AthleteRole.Player)) {
            return setRegPlayers(oldAddedRegPlayers => [...oldAddedRegPlayers, athlete])
        } else {
            setStatusReport({type: AlertType.error, msg: `Hráče ${athlete.name} nelze přidat pro nedostatek kapacity!`})
        }
        
    }

    const addRegGoalie = (athlete: IAthlete) => {
        // TODO check if player can be added (enough free places)
        if(isPlaceForRole(AthleteRole.Goalie)) {
            return setRegGoalies(oldAddedRegGoalies => [...oldAddedRegGoalies, athlete])
        } else {
            setStatusReport({type: AlertType.error, msg: `Brankáře ${athlete.name} nelze přidat pro nedostatek kapacity!`})
        }
    }
    
    const addRegReferee = (athlete: IAthlete) => {
        // TODO check if player can be added (enough free places)
        if(isPlaceForRole(AthleteRole.Referee)) {
            return setRegReferees(oldAddedRegReferees => [...oldAddedRegReferees, athlete])
        } else {
            setStatusReport({type: AlertType.error, msg: `Rozhodčího ${athlete.name} nelze přidat pro nedostatek kapacity!`})
        }
    }
    
    const removeRegPlayer = (athleteId: number) => setRegPlayers(oldAddedRegPlayers => oldAddedRegPlayers.filter(p => p.id != athleteId))
    const removeRegGoalie = (athleteId: number) => setRegGoalies(oldAddedRegGoalies => oldAddedRegGoalies.filter(g => g.id != athleteId))
    const removeRegReferee = (athleteId: number) => setRegReferees(oldAddedRegReferees => oldAddedRegReferees.filter(r => r.id != athleteId))

    const addNonRegPlayer = (name: string) => {
        
        if (nonRegPlayers.concat(nonRegGoalies, nonRegReferees).some(p => p.name == name)) {
            setStatusReport({type: AlertType.warning, msg: `Neregistrovaný hráč ${name} již byl přidán do této hry jako brankář nebo rozhodčí!`})
        } else if (!isPlaceForRole(AthleteRole.Player)) {
            setStatusReport({type: AlertType.error, msg: `Neregistrovaného hráče ${name} nelze přidat pro nedostatek kapacity!`})
        } 
        else {
            setNonRegPlayers(oldNonRegPlayers => [...oldNonRegPlayers, {name: name, added_by: user.id.toString()}])
            setStatusReport({type: AlertType.success, msg: `Neregistrovaný hráč ${name} byl úspěšně přidán do utkání!`})
        }
    }

    const addNonRegGoalie = (name: string) => {
        if (nonRegGoalies.concat(nonRegPlayers, nonRegReferees).some(p => p.name == name)) {
            setStatusReport({type: AlertType.warning, msg: `Neregistrovaný brankář ${name} již byl přidán do této hry jako hráč nebo rozhodčí!`})
        } else if (!isPlaceForRole(AthleteRole.Goalie)) {
            setStatusReport({type: AlertType.error, msg: `Neregistrovaného brankáře ${name} nelze přidat pro nedostatek kapacity!`})
        } else {
            setNonRegGoalies(oldNonRegGoalies => [...oldNonRegGoalies, {name: name, added_by: user.id.toString()}])
            setStatusReport({type: AlertType.success, msg: `Neregistrovaný brankář ${name} byl úspěšně přidán do utkání!`})
        }
    }

    const addNonRegReferee = (name: string) => {
        if (nonRegReferees.concat(nonRegPlayers, nonRegGoalies).some(p => p.name == name)) {
            setStatusReport({type: AlertType.warning, msg: `Neregistrovaný rozhodčí ${name} již byl přidán do této hry jako brankář nebo rozhodčí!`})
        } else if (!isPlaceForRole(AthleteRole.Referee)) {
            setStatusReport({type: AlertType.error, msg: `Neregistrovaného rozhodčího ${name} nelze přidat pro nedostatek kapacity!`})
        } else {
            setNonRegReferees(oldNonRegReferees => [...oldNonRegReferees, {name: name, added_by: user.id.toString()}])
            setStatusReport({type: AlertType.success, msg: `Neregistrovaný rozhodčí ${name} byl úspěšně přidán do utkání!`})
        }
    }

    // Non-registered players do not have any ID (yet), so we need to find them by name
    const removeNonRegPlayer = (name: string) => setNonRegPlayers(oldAddedNonRegPlayers => oldAddedNonRegPlayers.filter(p => p.name != name))
    const removeNonRegGoalie = (name: string) => setNonRegGoalies(oldAddedNonRegGoalies => oldAddedNonRegGoalies.filter(g => g.name != name))
    const removeNonRegReferee = (name: string) => setNonRegReferees(oldAddedNonRegReferees => oldAddedNonRegReferees.filter(r => r.name != name))

    return (
        <>
            {statusReport && <SnackbarAlert input={statusReport} clearingCb={setStatusReport}/> }
            <Header headerContent={newGameHeader()} />
            <VerticalMenu />
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
                                <div className="d-flex flex-column h-100">
                                    {/* ------------------------------ */}
                                    {/* First row in basic info */}
                                    <div className="d-flex flex-row justify-content-between pb-3 bottom-border">
                                        <div className="d-flex flex-column justify-content-between flex-1 me-3">
                                            <div className="d-flex flex-column justify-content-start mb-2">
                                                <InputLabel content="Titulek utkání" />
                                                <FormInput
                                                    onChange={(e: React.FormEvent<HTMLInputElement>) => updateGameTitle(e.currentTarget.value)}
                                                    type="text" value={gameTitle} />
                                                {errors.title}
                                            </div>
                                            <div style={{ flex: '1 0 auto' }}>
                                                <InputLabel content="Organizátoři" />
                                                <AthleteBadge showFollow={true} athlete={auth.userData.athlete} registered={true} />
                                            </div>
                                            {/* <div style={{ flex: '1 0 auto' }}>
                                                <InputLabel content="Soukromé utkání"/>
                                            </div> */}
                                        </div>
                                        <div className="d-flex flex-column justify-content-start flex-1 ms-3">
                                            <InputLabel content="Poznámky"/>
                                            <FormTextArea className="h-100"
                                                onChange={(e: React.FormEvent<HTMLTextAreaElement>) => setRemarks(e.currentTarget.value)}
                                                value={remarks} />
  
                                        </div>
                                    </div>
                                    {/* End of first row in basic info */}
                                    {/* ------------------------------ */}
                                    {/* ------------------------------ */}
                                    {/* Second row in basic info */}
                                    <div className="d-flex flex-column justify-content-evenly pt-3 pb-3 bottom-border">
                                        {/* First subrow */}
                                        <div className="d-flex flex-row mb-3 flex-1">
                                            <div className="d-flex flex-row flex-1 me-3">
                                                <div className="d-flex flex-column justify-content-start mb-2">
                                                    <InputLabel content="Místo konání" />
                                                    <div className="form-input-input"><GameLocSelect /></div>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row flex-1 ms-3">
                                                <div className="d-flex flex-column justify-content-start mb-2 me-3 flex-1 dateForm">
                                                        <InputLabel content="Datum" />
                                                        <FormInput
                                                            onChange={(e: React.FormEvent<HTMLInputElement>) => setGameDate(e.currentTarget.value)}
                                                            type="date" value={gameDate} />
                                                </div>
                                                <div className="d-flex flex-column justify-content-start mb-2 ms-3 flex-2">
                                                    {/* opakovani */}
                                                </div>
                                            </div>
                                        </div>
                                        {/* Second subrow */}
                                        <div className="d-flex flex-row flex-1">
                                            <div className="d-flex flex-row flex-1 me-3">
                                                <div className="d-flex flex-column justify-content-between mb-2 me-3">
                                                    <InputLabel content="Cena pronájmu ledu" />
                                                    <div className="input-group">
                                                        <FormInput type="number" min="0" value={pitchPrice} className="content-right"
                                                            onChange={(e: React.FormEvent<HTMLInputElement>) => setPitchPrice(e.currentTarget.value)} />
                                                        <div className="input-group-append">
                                                            <span className="input-group-text shadow rounded">Kč/h</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-column justify-content-between mb-2 ms-3">
                                                    <InputLabel content="Ostatní náklady" />
                                                    <div className="input-group">
                                                        <FormInput type="number" min="0" value={otherCosts} className="content-right"
                                                            onChange={(e: React.FormEvent<HTMLInputElement>) => setOtherCosts(e.currentTarget.value)} />
                                                        <div className="input-group-append">
                                                            <span className="input-group-text shadow rounded">Kč</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row flex-1 ms-3">
                                                <div className="d-flex flex-column justify-content-between flex-1 mb-2 me-3">
                                                    <InputLabel content="Čas začátku" />
                                                    <div className="input-group">
                                                        <FormInput
                                                            onChange={(e: React.FormEvent<HTMLInputElement>) => setStartTime(e.currentTarget.value)}
                                                            type="time" value={startTime} step="600" />
                                                        {errors.startTime}
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-column justify-content-between flex-1 mb-2 ms-3">
                                                        <InputLabel content="Čas konce" />
                                                        <div className="input-group">
                                                            <FormInput
                                                                onChange={(e: React.FormEvent<HTMLInputElement>) => updateEndTime(e.currentTarget.value)}
                                                                type="time" value={endTime} step="600" />
                                                            {errors.endTime}
                                                        </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="d-flex flex-column justify-content-evenly flex-1">
                                        <div className="d-flex flex-row justify-content-center align-items-start mt-2 flex-1">
                                            {/* First half of the row for referees and goalies */}
                                            <div className="d-flex flex-row justify-content-evenly h-100 me-3 flex-1">
                                                <div className="d-flex flex-column justify-content-center">
                                                    <div className="mb-1">
                                                        <InputLabel content="Požadované speciální role a jejich odměny" />
                                                    </div>
                                                    <div>
                                                        <div className="d-flex flex-row justify-content-between flex-1">
                                                            {/* Goalies */}
                                                            <div className="d-flex flex-row justify-content-evenly me-2 flex-2">
                                                                <div className="d-flex flex-column justify-content-center align-items-center flex-1">
                                                                    <GoalieIcon height={45} color='black'/>
                                                                </div>
                                                                <div className="d-flex flex-column ms-2 flex-2">
                                                                    <div className="mb-1 input-group">
                                                                        <FormInput type="number" min="0" value={expGoalies} className="content-right"
                                                                            onChange={(e: React.FormEvent<HTMLInputElement>) => setExpGoalies(e.currentTarget.value)} />
                                                                        <div className="input-group-append">
                                                                            <span className="input-group-text shadow rounded">ks</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="mt-1 input-group">
                                                                        <FormInput type="number" min="0" value={goalieRenum} className="content-right"
                                                                            onChange={(e: React.FormEvent<HTMLInputElement>) => setGoalieRenum(e.currentTarget.value)} />
                                                                        <div className="input-group-append">
                                                                            <span className="input-group-text shadow rounded">Kč</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* Referees */}
                                                            <div className="d-flex flex-row justify-content-between ms-2 flex-2">
                                                                <div className="d-flex flex-column justify-content-evenly flex-1">
                                                                    <RefereeIcon height={45} color='black' />
                                                                </div>
                                                                <div className="d-flex flex-column flex-2 ms-2">
                                                                    <div className="mb-1 input-group">
                                                                        <FormInput type="number" min="0" value={expReferees} className="content-right"
                                                                            onChange={(e: React.FormEvent<HTMLInputElement>) => setExpReferees(e.currentTarget.value)} />
                                                                        <div className="input-group-append">
                                                                            <span className="input-group-text shadow rounded">ks</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="input-group mt-1">
                                                                        <FormInput type="number" min="0" value={refRenum} className="content-right"
                                                                            onChange={(e: React.FormEvent<HTMLInputElement>) => setRefRenum(e.currentTarget.value)} />
                                                                        <div className="input-group-append">
                                                                            <span className="input-group-text shadow rounded">Kč</span>
                                                                        </div>
                                                                    </div>
                                                                </div>  
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Second half of the row for players */}
                                            <div className="d-flex flex-column justify-content-start align-items-center h-100 ms-3">
                                                <div className="d-flex flex-column justify-content-start flex-2">
                                                    <label style={{color: 'darkgrey'}}>Odhadovaná cena pro hráče</label>
                                                </div>
                                                <div className="d-flex flex-row justify-content-center flex-3">
                                                    <div>
                                                        <PlayerIcon height={45} color='black' />
                                                    </div>
                                                    <div className="input-group width-40">
                                                            <FormInput type="number" min="0" value={expPrice} className="content-right"
                                                                onChange={(e: React.FormEvent<HTMLInputElement>) => setExpPrice(e.currentTarget.value)} />
                                                            <div className="input-group-append">
                                                                <span className="input-group-text shadow rounded">Kč</span>
                                                            </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row justify-content-center flex-1">
                                            <div className="d-flex flex-column justify-content-center align-items-center mb-2">
                                                 <label style={{color: 'darkgrey'}}>Očekávaná úroveň</label>
                                                <div className="d-flex flex-column justify-content-center">
                                                    <SkillPucksSlider currentSkill={skillIndex} skillLevelCb={updateSkillCb} puckSize={40} iconKey={"new-game-skill"} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="newGame-helpers side">
                            <div className="newGame-recentlyOrganized">
                                <RecentlyOrganizedGames />
                            </div>
                            <div className="newGame-financialEstimate">
                                <FinancialEstimate />
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
                                <NewGameParticipants role={AthleteRole.Player} registered={regPlayers} addRegHandler={addRegPlayer}
                                    removeRegHandler={removeRegPlayer} nonRegistered={nonRegPlayers} addNonRegHandler={addNonRegPlayer}
                                    removeNonRegHandler={removeNonRegPlayer} expParticipantsCnt={Number(expPlayers)} />
                            </div>
                        </div>
                        <div className="newGame-helpers availableGroups side">
                            <AvailableGroups />
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
                                 <NewGameParticipants role={AthleteRole.Goalie} registered={regGoalies} addRegHandler={addRegGoalie}
                                    removeRegHandler={removeRegGoalie} nonRegistered={nonRegGoalies} addNonRegHandler={addNonRegGoalie}
                                    removeNonRegHandler={removeNonRegGoalie} expParticipantsCnt={Number(expGoalies)} />
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
                                <NewGameParticipants role={AthleteRole.Referee} registered={regReferees} addRegHandler={addRegReferee}
                                        removeRegHandler={removeRegReferee} nonRegistered={nonRegReferees} addNonRegHandler={addNonRegReferee}
                                        removeNonRegHandler={removeNonRegReferee} expParticipantsCnt={Number(expReferees)} />
                            </div>
                        </div>
                    </div>
                    {/* ------------------------------ */}
                    <div className="content-row newGame-addGame">
                        <div className="addGame-buttonPart main">
                            {/* <Link to={"/games"}> */}
                            <Button onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSubmit(e)} className="btn btn-primary btn-lg" caption="Vytvořit utkání" />
                            {/* </Link> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewGame


