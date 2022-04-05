import React, {useState, Component, useEffect, useRef, MouseEventHandler} from 'react';
import { Button, FormInput } from '..';
import { useAppSelector } from 'puckee-common/redux'
import Select, {ActionMeta} from 'react-select';
import makeAnimated from 'react-select/animated';
import { playerRoleOptions } from 'puckee-common/utils';
import { AthleteRoleOption, AthleteRole, SelectedAthleteRole, Athlete } from 'puckee-common/types'
import { SkillPucksSlider } from '../SkillPucks/SkillPucksSlider';
import { SkillDescription } from '../SkillPucks/SkillDescription';
import { Link } from 'react-router-dom';


export default function SignUpDetailsForm() {
    const [name, setName] = useState("");
    const [birthYear, setBirthYear] = useState("")
    const {status} = useAppSelector((state) => state.auth);
    const roleOptions = playerRoleOptions()
    const [selectedRoles, setSelectedRoles] = useState<AthleteRoleOption[] | unknown>([roleOptions[0]])
    // const [selectedRoles, setSelectedRoles] = useState<AthleteRoleOption[] | unknown>([])

    const prevPerfLevelPlayerRef= useRef<number>()
    const prevPerfLevelGoalieRef = useRef<number>()
    
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

    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault()
        // const cred: Credentials = {email: email, password: password}
        
        // dispatch(signup())
    }
    const handleSelectionUpdate = (option: readonly AthleteRoleOption[] | unknown, actionMeta: ActionMeta<AthleteRoleOption>) => {
        // setSelectedRoles(option)
        selectedTemp = option
    }

    const isSelected = (roleCaption: string) : boolean => {
        return (selectedRoles as SelectedAthleteRole[]).some(role => role.label == roleCaption )
    }

    interface RoleSkillProps {
        currentSkill: number,
        role: AthleteRole,
        updateSkillCb: (value: number) => void
    }

    const RoleSkill = ( {role, currentSkill, updateSkillCb} : RoleSkillProps) => {
        const type = role == AthleteRole.Player ? "Moje hráčské" : "Moje brankářské"
        const [skillIndex, setSkillIndex] = useState(currentSkill)
        
        const updateRoleSkill = (newValue: number) => {
            console.log("RoleSkill - updating internal skill to " + newValue)
            setSkillIndex(newValue)
            updateSkillCb(newValue)
        }

        const sliderId = "signup-slider-" + role
        return (
            <div className="signUp-skillSlider">
                {type} schopnosti:
                <SkillPucksSlider puckSize={44} className="signUpPucks" 
                        iconKey={sliderId} currentSkill={currentSkill}
                        skillLevelCb={updateRoleSkill} />
                <SkillDescription skillValue={skillIndex}/>
            </div>
        )}

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

    return (
        <div className="signUpWrapper">
            <form onSubmit={handleSignUp}>
                <div className="signUp-title">Něco málo o Tobě</div>
                    <div className="signUp-content details">
                        <div className="signUp-main">
                            <div className="content-inner-box">
                                {/* <div className="content-inner-row heading">
                                    Osobní údaje a preference
                                </div> */}
                                <div className="content-inner-row data signUp-personalInfo">
                                    <div className="form-group">
                                        <label className="form-label">Jméno a příjmení</label>
                                        <FormInput 
                                            onChange={(e: React.FormEvent<HTMLInputElement>) => setName(e.currentTarget.value)}
                                            type="text" value={name}/>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Rok narození</label>
                                        <FormInput 
                                            onChange={(e: React.FormEvent<HTMLInputElement>) => setBirthYear(e.currentTarget.value)}
                                            placeholder="E-mail" type="date" value={birthYear}/>
                                    </div>
                                    <div className="form-group">
                                            <label>Chci se účastnit jako</label>
                                            <AnimatedMultiSelect/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="signUp-roles">
                            <div className="signUp-roleSelectorSection">
                                <div className="content-inner-box">
                                    <div className="content-inner-row data signUp-accessData">
 
                                    </div>
                                </div>
                            </div>
                            <div className="signUp-roleSkillSection">
                                <div className="content-inner-box">
                                    <div className="content-inner-row heading">
                                        Hokejová zdatnost
                                    </div>
                                    <div className="content-inner-row data">
                                        <div className="signUp-skillSliders">
                                            {isSelected("Player") && <RoleSkill role={AthleteRole.Player} currentSkill={perfLevelPlayer} updateSkillCb={updatePlayerSkill}/>}
                                            {isSelected("Goalie") && <RoleSkill role={AthleteRole.Goalie} currentSkill={perfLevelGoalie} updateSkillCb={updateGoalieSkill}/>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='signUp-regBtnSection'>
                        <div className='signUp-regBtn'>
                            <Link to={"/games"}>
                                <Button className="btn btn-primary" type="submit" caption="Přeskočit a pokračovat na přehled utkání"/>
                            </Link>
                        </div>
                    </div>
            </form>
        </div>
    )
}