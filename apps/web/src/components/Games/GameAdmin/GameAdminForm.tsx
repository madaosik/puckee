import React, { useEffect, useState } from "react"
import { GameAdminParticipants, GameAdminFinancialEstimate, GameAdminAvailableGroups, GameAdminRecentlyOrganizedGames, initPlayers } from "."
import { Button, ErrorReport, FormTextArea } from "../../FormElements"
import { SkillPucksSlider } from "../../SkillPucks/SkillPucksSlider"
import { Athlete, AthleteRole, Game, GameLocOption, IAnonymAthlete, IAthlete, IceRink, IGame, IGameAnonymParticipantsAPI, IGameAnonymParticipantsIDAPI, IGameAPI, IGameParticipantsAPI, IIceRink, SelectedGameLoc } from "puckee-common/types"
import makeAnimated from 'react-select/animated';
import Select, { ActionMeta } from 'react-select';
import { FormInput, InputLabel } from "../../FormElements"
import { useAuth } from "puckee-common/auth"
import { Header } from "../../Header"
import VerticalMenu from "../../VerticalMenu"
import { useMutation, useQuery } from "react-query"
import { API_BASE, axiosConfig, fetchGameById, fetchGameParticipantsById, fetchIceRinks, useFetchGameById } from "puckee-common/api"
import { AthleteBadge } from "../../AthleteBadge"
import { GoalieIcon, PlayerIcon, RefereeIcon } from "../../../Icons"
import { queryClient } from "../../../../App"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { NOTIFICATION, useNotifications } from "puckee-common/context/NotificationsContext"
import { gameLocOptions } from "puckee-common/utils"
// import { Loading } from "../../../pages"
import CircularProgress from '@mui/material/CircularProgress';

class NewGameFormError {
    title: React.ReactNode
    startTime: React.ReactNode
    endTime: React.ReactNode
    location: React.ReactNode
    constructor() {
        this.title = <ErrorReport />
        this.startTime = <ErrorReport />
        this.endTime = <ErrorReport />
        this.location = <ErrorReport />
    }
}

export default function GameAdminForm()
{
    const { id } = useParams()
    const isAddMode = !id;
    const auth = useAuth()
    var locOptions: GameLocOption[] | undefined = undefined
    var locationToUpdate: GameLocOption | undefined = undefined

    const { error: errorRinks, data: dataRinks, isSuccess: isSuccessRinks } = useQuery("icerink", fetchIceRinks);

    if (isSuccessRinks) {
        const rinksArray = (dataRinks as IIceRink[]).map((r: IIceRink) => (new IceRink().deserialize(r)))
        locOptions = rinksArray.map(r => r.generateLocOption())
    }

    const { data: gameData, isLoading: isLoadingGame, isSuccess: isSuccessGame } = useQuery(["game", id, auth.userData.athlete.id, false], () => fetchGameById(id!, auth.userData.athlete.id, false),
        { enabled: !isAddMode && isSuccessRinks },
    )

    const { data: participData, isLoading: isLoadingParticip, isSuccess: isSuccessParticip } = useQuery(["participants", id, auth.userData.athlete.id, false],
        () => fetchGameParticipantsById(id!, auth.userData.athlete.id), { enabled: !isAddMode && isSuccessRinks },
    )


    const navigate = useNavigate()
    const { setNotification } = useNotifications()
    const user = new Athlete().deserialize(auth.userData.athlete)
    const preferredRole = user.preferredRole()
    
    var redirectAfterSuccess = false
    const [game, setGame] = useState(new Game(user))

    const [errors, setErrors] = useState(new NewGameFormError())
    const [formErrors, setFormErrors] = useState(false)

    const [headerTitle, setHeaderTitle] = useState("Nové utkání")
    const [gameTitle, setGameTitle] = useState(game.name)
    const [remarks, setRemarks] = useState(game.remarks)
    const [organizers, setOrganizers] = useState<IAthlete[]>(isSuccessGame ? [auth.userData.athlete] : game.organizers)
    const [privateGame, setPrivateGame] = useState<boolean>(game.is_private)

    const [selectedLoc, setSelectedLoc] = useState<GameLocOption | unknown>(isSuccessGame ? null : locationToUpdate)
    const [gameDate, setGameDate] = useState(Game.dateInputString(game.start_time))
    const [pitchPrice, setPitchPrice] = useState("0")
    const [otherCosts, setOtherCosts] = useState("0")
    const [startTime, setStartTime] = useState(Game.timeInputString(game.start_time))
    const [endTime, setEndTime] = useState(Game.timeInputString(game.end_time))

    const [expPlayers, setExpPlayers] = useState(game.exp_players_cnt.toString())
    const [expGoalies, setExpGoalies] = useState(game.exp_goalies_cnt.toString())
    const [expReferees, setExpReferees] = useState(game.exp_referees_cnt.toString())
    const [expPrice, setExpPrice] = useState("250")

    const [goalieRenum, setGoalieRenum] = useState(game.goalie_renum.toString())
    const [refRenum, setRefRenum] = useState(game.referee_renum.toString())
    const [isPrivate, setIsPrivate] = useState(false)
    

    const [regPlayers, setRegPlayers] = useState<IAthlete[]>(initPlayers())
    const [nonRegPlayers, setNonRegPlayers] = useState<IAnonymAthlete[]>([])
    const [regGoalies, setRegGoalies] = useState<IAthlete[]>((preferredRole == AthleteRole.Goalie) ? [auth.userData.athlete] : [])
    const [nonRegGoalies, setNonRegGoalies] = useState<IAnonymAthlete[]>([])
    const [regReferees, setRegReferees] = useState<IAthlete[]>((preferredRole == AthleteRole.Referee) ? [auth.userData.athlete] : [])
    const [nonRegReferees, setNonRegReferees] = useState<IAnonymAthlete[]>([])
    
    // Component is used as an edit form
    useEffect(() => {
        if (isSuccessGame) {
            setHeaderTitle(gameData.name)
            setGameTitle(gameData.name)
            setRemarks(gameData.remarks)
            setOrganizers(gameData.organizers)
            setIsPrivate(gameData.is_private)
            const getIceRinkOption = (location_id: number): GameLocOption => locOptions!.find((locOption) => locOption.value == location_id)
            var iceRinkOption = getIceRinkOption(gameData.location_id)
            setSelectedLoc(iceRinkOption)
            setPitchPrice(iceRinkOption.price_per_hour)
            setOtherCosts(gameData.other_costs)
            const start_datetime = new Date(gameData.start_time)
            setGameDate(Game.dateInputString(start_datetime))
            setStartTime(Game.timeInputString(start_datetime))
            setEndTime(Game.timeInputString(new Date(gameData.end_time)))
            setSkillIndex(gameData.exp_skill)
            setExpPlayers(gameData.exp_players_cnt)
            setExpGoalies(gameData.exp_goalies_cnt)
            setExpReferees(gameData.exp_referees_cnt)
            setExpPrice(gameData.est_price)
            setGoalieRenum(gameData.goalie_renum)
            setRefRenum(gameData.referee_renum)

        }
    },[gameData])

    useEffect(() => {
        if (isSuccessParticip) {
            setRegPlayers(participData.players)
            setNonRegPlayers(participData.anonym_players)
            setRegGoalies(participData.goalies)
            setNonRegGoalies(participData.anonym_goalies)
            setRegReferees(participData.referees)
            setNonRegReferees(participData.anonym_referees)
        }
    },[participData])

    var errorsToShow = new NewGameFormError();

    useEffect(() => {
        if(formErrors) {
            window.scrollTo(0, 0)
        }
      },[errorsToShow])

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


    const createGameMutation = useMutation((newGame : IGameAPI) => {
        return axios.post(`${API_BASE}/game`, JSON.stringify(newGame), axiosConfig)
      },
        {
            onSuccess: (response) => {
                queryClient.invalidateQueries('game')
                navigate('/games')
                setNotification({message: 'Utkání bylo úspěšně vytvořeno!', variant: NOTIFICATION.SUCCESS, timeout: 4000})
            },
            onError: (error) => {
                console.error(error)
            }
        }
    )
    
    const updateGameMutation = useMutation((updatedGame : IGameAPI) => {
        return axios.put(`${API_BASE}/game`, JSON.stringify(updatedGame), axiosConfig)
      },
        {
            onSuccess: (response) => {
                queryClient.invalidateQueries('game')
                if (redirectAfterSuccess) {
                    navigate(-1)
                }
                setNotification({message: 'Utkání bylo úspěšně aktualizováno!', variant: NOTIFICATION.SUCCESS, timeout: 4000})
            },
            onError: (error) => {
                console.error(error)
            }
        }
    )

    const addAthleteMutation = useMutation((addGameRole : IGameParticipantsAPI | IGameAnonymParticipantsAPI) => {
        console.log(addGameRole)
        return axios.post(`${API_BASE}/game/${gameData.id}/participants`, JSON.stringify(addGameRole), axiosConfig)
      },
        {
            onSuccess: (response) => {
                queryClient.invalidateQueries('game')
                queryClient.invalidateQueries(['participants', id, auth.userData.athlete.id, false])
            },
            onError: (error) => {
                console.error(error)
            }
        }
    )

    const removeRoleMutation = useMutation( (removeRole: IGameAnonymParticipantsIDAPI) => {
        const reqParam: string = removeRole.athleteId ? `athlete_id=${removeRole.athleteId}` : `athlete_name=${removeRole.athleteName}`
        return axios.delete(`${API_BASE}/game/${gameData.id}/participants?${reqParam}`, axiosConfig)
    },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('game')
                queryClient.invalidateQueries(['participants', id, auth.userData.athlete.id, false])
                setNotification({message: `Odhlášení z utkání '${gameData.name}' proběhlo úspěšně`, variant: NOTIFICATION.SUCCESS, timeout: 4000})
            },
            onError: (error) => {
                console.error(error)
                setNotification({message: "Nepodařilo se odhlásit z utkání!", variant: NOTIFICATION.ERROR, timeout: 4000})
            }
    })


    const deleteGameMutation = useMutation( () => {
            return axios.delete(`${API_BASE}/game/${gameData.id}`)
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('game')
                setNotification({message: `Utkání '${gameData.name}' bylo úspěšně zrušeno!`, variant: NOTIFICATION.SUCCESS, timeout: 4000})
                navigate(-1)
            },
            onError: (error) => {
                console.error(error)
                setNotification({message: "Nepodařilo se zrušit utkání!", variant: NOTIFICATION.ERROR, timeout: 4000})
            }
        }
    )

    // const handleDeletion = (e: React.MouseEvent<HTMLButtonElement>, redirect: boolean) => {

    // }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>, redirect: boolean) => {
        e.preventDefault()
        var errorFlag = false
        if (gameTitle === "") {
            errorsToShow.title = <ErrorReport msg="Chybí název utkání!" />
            errorFlag = true
        }

        const startTimeApi = Game.datetimeAPIstring(gameDate, startTime)
        const endTimeApi = Game.datetimeAPIstring(gameDate, endTime)
        const startTimeObj = new Date(startTimeApi)
        const endTimeObj = new Date(endTimeApi)

        if (startTimeObj > endTimeObj) {
            errorsToShow.endTime = <ErrorReport msg="Konec utkání je dřív než jeho začátek!" />
            errorFlag = true
        }

        if (startTime === "") {
            errorsToShow.startTime = <ErrorReport msg="Kdy budete začínat?" />
            errorFlag = true
        }
        if (endTime === "") {
            errorsToShow.endTime = <ErrorReport msg="Kdy budete končit?" />
            errorFlag = true
        }

        if (selectedLoc == null) {
            errorsToShow.location = <ErrorReport msg="Kde budete hrát?" />
            errorFlag = true
        }
        
        setErrors(errorsToShow)

        if (errorFlag) {
            setNotification({message: "Formulář obsahuje chyby!", variant: NOTIFICATION.ERROR, timeout: 4000})
            return
        }

        if (redirect) {
            redirectAfterSuccess = true
        }

        if (isAddMode) {

            createGameMutation.mutate(
                {
                    name: gameTitle,
                    exp_players_cnt: Number(expPlayers),
                    exp_goalies_cnt: Number(expGoalies),
                    exp_referees_cnt: Number(expReferees),
                    location_id: selectedLoc.value,
                    est_price: Number(expPrice),
                    remarks: remarks,
                    start_time: startTimeApi,
                    end_time: endTimeApi,
                    other_costs: Number(otherCosts),
                    is_private: isPrivate,
                    goalie_renum: Number(goalieRenum),
                    referee_renum: Number(refRenum),
                    exp_skill: skillIndex,
                    
                    players: regPlayers.map((p) => p.id),
                    anonym_players: nonRegPlayers.map((p) => p.name),
                    organizers: organizers.map((p) => p.id),
                    goalies: regGoalies.map((p) => p.id),
                    anonym_goalies: nonRegGoalies.map((p) => p.name),
                    referees: regReferees.map((p) => p.id),
                    anonym_referees: nonRegReferees.map((p) => p.name),
                }
            )
        } else {
            console.log(startTime)

            updateGameMutation.mutate( {
                    id: gameData.id,
                    name: gameTitle,
                    exp_players_cnt: Number(expPlayers),
                    exp_goalies_cnt: Number(expGoalies),
                    exp_referees_cnt: Number(expReferees),
                    location_id: selectedLoc.value,
                    est_price: Number(expPrice),
                    remarks: remarks,
                    start_time: startTimeApi,
                    end_time: endTimeApi,
                    other_costs: Number(otherCosts),
                    is_private: isPrivate,
                    goalie_renum: Number(goalieRenum),
                    referee_renum: Number(refRenum),
                    exp_skill: skillIndex,
            })
        }

    }

    const newGameHeader = () => {
        return <>{headerTitle}</>
    }

    interface IActionMap {
        set: {
            reg: (value: React.SetStateAction<IAthlete[]>) => void
            anonym: (value: React.SetStateAction<IAnonymAthlete[]>) => void
        }
        isPlace: boolean
        name: string
    }

    const actionMap = (role: AthleteRole) : IActionMap => {
        switch (role) {
            case (AthleteRole.Player):
                return { 
                        set: {
                            reg: setRegPlayers,
                            anonym: setNonRegPlayers
                        },
                        isPlace: (regPlayers.length + nonRegPlayers.length) < Number(expPlayers),
                        name: "Hráče"
                        }
            case (AthleteRole.Goalie):
                return { 
                        set: {
                            reg: setRegGoalies,
                            anonym: setNonRegGoalies
                        },
                        isPlace: (regGoalies.length + nonRegGoalies.length) < Number(expGoalies),
                        name: "Brankáře"
                        }
            case (AthleteRole.Referee):
                return { 
                        set: {
                            reg: setRegReferees,
                            anonym: setNonRegReferees
                        },
                        isPlace: (regReferees.length + nonRegReferees.length) < Number(expReferees),
                        name: "Rozhodčího"
                        }
            default:
                throw new Error("Unexpected athlete role has been provided!")
        }
    }

    const reportFull = (roleMap : IActionMap, athlete: IAthlete | IAnonymAthlete) => {
        setNotification({message: `${roleMap.name} ${athlete.name} nelze přidat pro nedostatek kapacity!`, variant: NOTIFICATION.ERROR, timeout: 4000})
    }

    const addRegParticipant = (athlete: IAthlete, role: AthleteRole) => {
        const roleMap = actionMap(role)
        if(!roleMap.isPlace) {
            return reportFull(roleMap, athlete)
        }

        if(isAddMode) {
            return roleMap.set.reg(oldAddedRegAthletes => [...oldAddedRegAthletes, athlete])
        } else {
            return addAthleteMutation.mutate({athlete_id: athlete.id, athlete_role: role})
        }
    }

    const removeRegParticipant = (id: number, role: AthleteRole) => {
        const roleMap = actionMap(role)
        if(isAddMode) {
            roleMap.set.reg(oldAddedRegAthletes => oldAddedRegAthletes.filter(a => a.id != id))
        } else {
            removeRoleMutation.mutate({athleteId: id})
        }
    }

    const addAnonymParticipant = (athlete: IAnonymAthlete, role: AthleteRole) => {
        const roleMap = actionMap(role)
        if(!roleMap.isPlace) {
            return reportFull(roleMap, athlete)
        }

        if (nonRegPlayers.concat(nonRegGoalies, nonRegReferees).some(p => p.name == athlete.name)) {
            return setNotification({message: `Neregistrovaný hráč ${name} již byl přidán do této hry jako brankář nebo rozhodčí!`, variant: NOTIFICATION.ALERT, timeout: 4000})
        }

        if(isAddMode) {
            return roleMap.set.anonym(oldAddedRegAthletes => [...oldAddedRegAthletes, athlete])
        } else {
            return addAthleteMutation.mutate({athlete_name: athlete.name, athlete_role: role, requesting_id: auth.userData.athlete.id})
        }
    }

    const removeAnonymParticipant = (name: string, role: AthleteRole) => {
        const roleMap = actionMap(role)
        if(isAddMode) {
            roleMap.set.anonym(oldAddedAnonymAthletes => oldAddedAnonymAthletes.filter(a => a.name != name))
        } else {
            removeRoleMutation.mutate({athleteName: name})
        }
    }

    if(isLoadingGame) {
        return (
                <>
                    <Header headerContent={<></>} />
                    <VerticalMenu />
                    <div className="main-content">
                        <div className="content-container">
                            <div className="d-flex flex-column flex-1 justify-content-center align-items-center">
                                <CircularProgress size={80}/>
                            </div>
                        </div>
                    </div>
                </>
            )
    }
    return (
        <>
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
                                                <AthleteBadge role={AthleteRole.Organizer} showFollow={true} athlete={auth.userData.athlete} registered={true} />
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
                                                    {errors.location}
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
                                                <div className="d-flex flex-column justify-content-start align-items-start mb-2 me-3">
                                                    <InputLabel content="Cena pronájmu ledu" />
                                                    <div className="input-group">
                                                        <FormInput type="number" min="0" value={pitchPrice} className="content-right"
                                                            onChange={(e: React.FormEvent<HTMLInputElement>) => setPitchPrice(e.currentTarget.value)} />
                                                        <div className="input-group-append">
                                                            <span className="input-group-text shadow rounded">Kč/h</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-column mb-2 ms-3">
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
                                                <div className="d-flex flex-column flex-1 mb-2 me-3">
                                                    <InputLabel content="Čas začátku" />
                                                    <div className="input-group">
                                                        <FormInput
                                                            onChange={(e: React.FormEvent<HTMLInputElement>) => setStartTime(e.currentTarget.value)}
                                                            type="time" value={startTime} step="600" />
                                                        {errors.startTime}
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-column flex-1 mb-2 ms-3">
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
                                                                <div className="d-flex flex-column ms-1 flex-2">
                                                                    <div className="mb-1 input-group">
                                                                        <FormInput type="number" min="0" value={expGoalies} className="content-right"
                                                                            onChange={(e: React.FormEvent<HTMLInputElement>) => setExpGoalies(e.currentTarget.value)} />
                                                                        <div className="input-group-append">
                                                                            <span className="input-group-text shadow rounded">ks</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="mt-1 input-group">
                                                                        <FormInput type="number" min="0" value={goalieRenum} className="content-right text-success"
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
                                                                <div className="d-flex flex-column flex-2 ms-1">
                                                                    <div className="mb-1 input-group">
                                                                        <FormInput type="number" min="0" value={expReferees} className="content-right"
                                                                            onChange={(e: React.FormEvent<HTMLInputElement>) => setExpReferees(e.currentTarget.value)} />
                                                                        <div className="input-group-append">
                                                                            <span className="input-group-text shadow rounded">ks</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="input-group mt-1">
                                                                        <FormInput type="number" min="0" value={refRenum} className="content-right text-success"
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
                                            <div className="d-flex flex-column justify-content-start align-items-center h-100 ms-3 flex-1">
                                                <div className="d-flex flex-column justify-content-start flex-2">
                                                    <label style={{color: 'darkgrey'}}>Požadované počty hráčů a odhadovaná cena</label>
                                                </div>
                                                <div className="d-flex flex-row justify-content-between ms-2 flex-2 cssa">
                                                    <div className="d-flex flex-column justify-content-evenly flex-1">
                                                        <PlayerIcon height={45} color='black' />
                                                    </div>
                                                    <div className="d-flex flex-column flex-2 ms-2">
                                                        <div className="mb-1 input-group">
                                                            <FormInput type="number" min="0" value={expPlayers} className="content-right"
                                                                onChange={(e: React.FormEvent<HTMLInputElement>) => setExpPlayers(e.currentTarget.value)} />
                                                            <div className="input-group-append">
                                                                <span className="input-group-text shadow rounded">ks</span>
                                                            </div>
                                                        </div>
                                                        <div className="input-group mt-1">
                                                            <FormInput type="number" min="0" value={expPrice} className="content-right text-danger"
                                                                onChange={(e: React.FormEvent<HTMLInputElement>) => setExpPrice(e.currentTarget.value)} />
                                                            <div className="input-group-append">
                                                                <span className="input-group-text shadow rounded">Kč</span>
                                                            </div>
                                                        </div>
                                                    </div>  
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row justify-content-center flex-1 mt-3">
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
                                <GameAdminRecentlyOrganizedGames />
                            </div>
                            <div className="newGame-financialEstimate">
                                <GameAdminFinancialEstimate />
                            </div>
                        </div>
                    </div>
                    {!isAddMode &&
                        <div className="d-flex flex-row main">
                            <div className="d-flex flex-row justify-content-start flex-1">
                                <Button onClick={(e: React.MouseEvent<HTMLButtonElement>) => deleteGameMutation.mutate()} className="btn btn-danger" caption="Zrušit utkání" />
                            </div>
                            <div className="d-flex flex-1 flex-row justify-content-end">
                                <div className="me-2">
                                    <Button onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSubmit(e, false)} className="btn btn-primary" caption="Uložit" />
                                </div>
                                <div>
                                    <Button onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSubmit(e, true)} className="btn btn-primary" caption="Uložit a odejít" />
                                </div>
                            </div>
                        </div>
                    }
                    {/* /* END OF BASIC GAME INFO SECTION */
                    /* ------------------------------ */
                    /* PLAYERS SECTION */}
                    <div className="content-row newGame-attendees">
                        <div className="newGame-section main">
                            <div className="content-inner-row heading">
                                Hráči v poli
                            </div>
                            <div className="content-inner-row data">
                                <GameAdminParticipants role={AthleteRole.Player} registered={regPlayers} addRegHandler={addRegParticipant}
                                    removeRegHandler={removeRegParticipant} nonRegistered={nonRegPlayers} addNonRegHandler={addAnonymParticipant}
                                    removeNonRegHandler={removeAnonymParticipant} expParticipantsCnt={Number(expPlayers)} />
                            </div>
                        </div>
                        <div className="newGame-helpers availableGroups side">
                            <GameAdminAvailableGroups />
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
                                <GameAdminParticipants role={AthleteRole.Goalie} registered={regGoalies} addRegHandler={addRegParticipant}
                                    removeRegHandler={removeRegParticipant} nonRegistered={nonRegGoalies} addNonRegHandler={addAnonymParticipant}
                                    removeNonRegHandler={removeAnonymParticipant} expParticipantsCnt={Number(expGoalies)} />
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
                                <GameAdminParticipants role={AthleteRole.Referee} registered={regReferees} addRegHandler={addRegParticipant}
                                        removeRegHandler={removeRegParticipant} nonRegistered={nonRegReferees} addNonRegHandler={addAnonymParticipant}
                                        removeNonRegHandler={removeAnonymParticipant} expParticipantsCnt={Number(expReferees)} />
                            </div>
                        </div>
                    </div>
                    {/* ------------------------------ */}
                    <div className="content-row newGame-addGame">
                        <div className="addGame-buttonPart main">
                            {isAddMode &&
                                <Button onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSubmit(e, true)} className="btn btn-primary btn-lg" caption="Vytvořit utkání" />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


