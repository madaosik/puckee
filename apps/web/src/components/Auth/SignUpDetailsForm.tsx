import React, {useState, useEffect, useRef } from 'react';
import { Button, ErrorReport, FormInput } from '../FormElements';
import Select, {ActionMeta} from 'react-select';
import makeAnimated from 'react-select/animated';
import { playerRoleOptions } from 'puckee-common/utils';
import { AthleteRoleOption, AthleteRole, SelectedAthleteRole, ISignupDetailsAPI, AthleteRoleType } from 'puckee-common/types'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NOTIFICATION, useNotifications } from 'puckee-common/context/NotificationsContext';
import RoleSkill from './RoleSkill';
import { useMutation } from 'react-query';
import { API_BASE, axiosConfig } from 'puckee-common/api';
import { queryClient } from '../../../App';
import axios from 'axios';
import { useAuth } from 'puckee-common/auth';

export class SignInDetailsFormError {
    name: React.ReactNode
    surname: React.ReactNode
    birthMonth: React.ReactNode
    roles: React.ReactNode
    playerSkill: React.ReactNode
    goalieSkill: React.ReactNode
    constructor() {
        this.name = <ErrorReport/>
        this.surname = <ErrorReport/>
        this.birthMonth = <ErrorReport/>
        this.roles = <ErrorReport/>
        this.playerSkill = <ErrorReport/>
        this.goalieSkill = <ErrorReport/>
    }
}

export default function SignUpDetailsForm() {
    const [name, setName] = useState("")
    const [surname, setSurname] =  useState("")
    const [birthMonth, setBirthMonth] = useState("")
    const roleOptions = playerRoleOptions()
    const [selectedRoles, setSelectedRoles] = useState<AthleteRoleOption[] | unknown>([roleOptions[0]])
    const [errors, setErrors] = useState(new SignInDetailsFormError())
    const prevPerfLevelPlayerRef= useRef<number>()
    const prevPerfLevelGoalieRef = useRef<number>()
    const { setNotification } = useNotifications()
    const navigate = useNavigate()
    const auth = useAuth()
    const location = useLocation()
    // console.log(location.state?)
    // console.log(location)

    const [perfLevelPlayer, setPerfLevelPlayer] = useState(0)
    const [perfLevelGoalie, setPerfLevelGoalie] = useState(0)
    
    useEffect(() => {
        prevPerfLevelPlayerRef.current = perfLevelPlayer
        prevPerfLevelGoalieRef.current = perfLevelGoalie
    })
    const playerPreviousSkill = prevPerfLevelPlayerRef.current
    const goaliePreviousSkill = prevPerfLevelGoalieRef.current

    // Temporary selected roles storage to ensure the MultiSelect is not re-rendered
    var selectedTemp = [] as AthleteRoleOption

    const isInSelected = (role: AthleteRole) => (selectedRoles as AthleteRoleOption[]).some(r => r.value == role)
    const generateRoleDict = () => {
        var roles = [] as AthleteRoleType[]
        (selectedRoles as AthleteRoleOption[]).forEach(r => {
            switch (r.value) {
                case AthleteRole.Player:
                    roles.push({id: AthleteRole.Player, skill_level: perfLevelPlayer})
                    break
                case AthleteRole.Goalie:
                    roles.push({id: AthleteRole.Goalie, skill_level: perfLevelGoalie})
                    break
                default:
                    roles.push({id: r.value, skill_level: 0})
            }
        })
        return roles
    }


    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault()
        var errorsToShow = new SignInDetailsFormError();
        var rerenderFlag : boolean = false
        if (name==="") {
            errorsToShow.name = <ErrorReport msg="Zadej své křestní jméno!"/>
            rerenderFlag = true
        }
        if (surname==="") {
            errorsToShow.surname = <ErrorReport msg="Zadej příjmení!"/>
            rerenderFlag = true
        }
        if (birthMonth==="") {
            errorsToShow.birthMonth = <ErrorReport msg="Vyber svůj měsíc narození!"/>
            rerenderFlag = true
        }

        if (selectedRoles.length == 0) {
            errorsToShow.roles = <ErrorReport msg="Zvol alespoň jednu účastnickou roli!"/>
            rerenderFlag = true
        }

        if (isInSelected(AthleteRole.Player) && perfLevelPlayer == 0) {
            errorsToShow.playerSkill = <ErrorReport msg="Doplň svoji hráčskou výkonnost!" className='d-flex flex-row justify-content-center'/>
            rerenderFlag = true
        }

        if (isInSelected(AthleteRole.Goalie) && perfLevelGoalie == 0) {
            errorsToShow.goalieSkill = <ErrorReport msg="Doplň svoji brankářskou výkonnost!" className='d-flex flex-row justify-content-center mt-2'/>
            rerenderFlag = true
        }

        if(rerenderFlag) {
            setErrors(errorsToShow)
            setNotification({message: `Formulář obsahuje chyby!`, variant: NOTIFICATION.ERROR, timeout: 4000})
            return
        }

        console.log(generateRoleDict())
        console.log(auth.userData.athlete.id)
        addSignupDetailsMutation.mutate( {
            id: auth.userData.athlete.id,
            name: name,
            surname: surname,
            roles: generateRoleDict(),
            birth_month: `${birthMonth}-01`
        })


    }

    const addSignupDetailsMutation = useMutation((profileUpdate : ISignupDetailsAPI) => {
        return axios.post(`${API_BASE}/auth/signup-details`, JSON.stringify(profileUpdate), axiosConfig)
      },
        {
            onSuccess: (response) => {
                queryClient.invalidateQueries('game')
                auth.userData.athlete.name = response.data.name
                auth.userData.athlete.surname = response.data.surname
                auth.userData.athlete.roles = response.data.roles
                if(location.state?.from === '/sign-up') {
                    navigate("/games")
                } else {
                    navigate("/profile", { state: {regSuccess: true, updatedUserData: response.data} })
                }
                setNotification({message: 'Profil byl úspěšně aktualizován!', variant: NOTIFICATION.SUCCESS, timeout: 4000})
            },
            onError: (error) => {
                setNotification({message: 'Nepodařilo se aktualizovat profil!', variant: NOTIFICATION.ERROR, timeout: 4000})
                console.error(error)
            }
        }
    )

    const handleSelectionUpdate = (option: readonly AthleteRoleOption[] | unknown, actionMeta: ActionMeta<AthleteRoleOption>) => {
        // setSelectedRoles(option)
        selectedTemp = option
    }

    const isSelected = (roleCaption: string) : boolean => {
        return (selectedRoles as SelectedAthleteRole[]).some(role => role.label == roleCaption )
    }

    const AnimatedMultiSelect = () => {
        return (
          <Select
            closeMenuOnSelect={false}
            components={makeAnimated()}
            defaultValue={selectedRoles}
            isMulti
            options={roleOptions}
            placeholder="Vyber požadované role"
            className="roleMultiSelect"
            onChange={handleSelectionUpdate}
            noOptionsMessage={() => null}
            onMenuClose={() => {
                setSelectedRoles(selectedTemp as AthleteRoleOption[])
            }}
          />
        );
      }
    
    const updatePlayerSkill = (skillLevel: number) => {
        setPerfLevelPlayer(skillLevel)
        console.log("player skill at highest level " + skillLevel)
    }

    const updateGoalieSkill = (skillLevel: number) => {
        setPerfLevelGoalie(skillLevel)
        console.log("goalie skill at highest level " + skillLevel)
    }

    const submitBtnCaption = () => {
        if (location.state?.from === '/sign-up') {
            return "Uložit a pokračovat na přehled utkání"
        } else {
            return "Uložit profil"
        }
    }

    return (
            <div className="signUpWrapper">
                <form onSubmit={handleSignUp}>
                    <div className='d-flex flex-row justify-content-center'>
                        <div className="signUp-title">
                            Něco málo o Tobě
                        </div>
                        { location.state?.from === '/sign-up' &&
                            <div className='ms-3'>
                                <Link to={"/games"}>
                                    <Button className="btn btn-outline-primary" type="submit" caption="Přeskočit"/>
                                </Link>
                            </div>
                        }
                    </div>
                    {/* <div className='signUp-regBtnSection'>
                        <div className='signUp-regBtn'>
                            <Link to={"/games"}>
                                <Button className="btn btn-outline-primary" type="submit" caption="Přeskočit"/>
                            </Link>
                        </div>
                    </div> */}
                    <div className="signUp-content details">
                        <div className="signUp-main">
                            <div className="content-inner-box">
                                <div className="content-inner-row heading">
                                   Osobní údaje a hokejové role
                                </div>
                                <div className="content-inner-row data signUp-personalInfo">
                                    <div className="form-group">
                                        <label className="form-label">Jméno</label>
                                        <FormInput 
                                            onChange={(e: React.FormEvent<HTMLInputElement>) => setName(e.currentTarget.value)}
                                            type="text" value={name}/>
                                        {errors.name}
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Příjmení</label>
                                        <FormInput 
                                            onChange={(e: React.FormEvent<HTMLInputElement>) => setSurname(e.currentTarget.value)}
                                            type="text" value={surname}/>
                                        {errors.surname}
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Měsíc a rok narození</label>
                                        <FormInput 
                                            onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                                setBirthMonth(e.currentTarget.value)
                                            }}
                                            placeholder="E-mail" type="month" value={birthMonth}/>
                                        {errors.birthMonth}
                                    </div>
                                    <div className="form-group">
                                            <label>Chci se účastnit jako</label>
                                            <AnimatedMultiSelect/>
                                            {errors.roles}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="signUp-roles">
                            {/* <div className="signUp-roleSelectorSection">
                                <div className="content-inner-box">
                                    <div className="content-inner-row data signUp-accessData">
 
                                    </div>
                                </div>
                            </div> */}
                            <div className="d-flex flex-1">
                                <div className="content-inner-box">
                                    <div className="content-inner-row heading">
                                        Hokejová zdatnost
                                    </div>
                                    <div className="d-flex flex-column flex-1 bg-white bottomRadius">
                                        <div className="d-flex flex-column flex-1 justify-content-evenly pt-3">
                                            <div className='d-flex flex-column justify-content-center'>
                                                {isSelected("Player") && 
                                                    (
                                                    <>
                                                        <RoleSkill role={AthleteRole.Player} currentSkill={perfLevelPlayer} updateSkillCb={updatePlayerSkill}/>
                                                        <div className='d-flex flex-column justify-content-center'>{errors.playerSkill}</div>
                                                    </>
                                                    )
                                                } 
                                            </div>
                                            <div>
                                                {isSelected("Goalie") && 
                                                    (
                                                    <>
                                                        <RoleSkill role={AthleteRole.Goalie} currentSkill={perfLevelGoalie} updateSkillCb={updateGoalieSkill}/>
                                                        <div className='d-flex flex-column justify-content-center'>{errors.goalieSkill}</div>
                                                    </>
                                                    )
                                                } 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='signUp-regBtnSection'>
                        <div className='signUp-regBtn'>
                            {/* <Link to={"/games"}> */}
                                <Button className="btn btn-primary" type="submit" caption={submitBtnCaption()}/>
                            {/* </Link> */}
                        </div>
                    </div>
            </form>
        </div>
    )
}