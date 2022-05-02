import { AthleteRole } from "puckee-common/types"
import React, { useState } from "react"
import { SkillDescription } from "../SkillPucks/SkillDescription"
import { SkillPucksSlider } from "../SkillPucks/SkillPucksSlider"

interface RoleSkillProps {
    currentSkill: number,
    role?: AthleteRole,
    updateSkillCb: (value: number) => void
}

export default function RoleSkill( {role, currentSkill, updateSkillCb} : RoleSkillProps)
{
    const type = role == AthleteRole.Player ? "Moje hráčské" : "Moje brankářské"
    const [skillIndex, setSkillIndex] = useState(currentSkill)
    
    const updateRoleSkill = (newValue: number) => {
        console.log("RoleSkill - updating internal skill to " + newValue)
        setSkillIndex(newValue)
        updateSkillCb(newValue)
    }

    const sliderId = "signup-slider-" + role
    return (
        <div className="d-flex flex-1 flex-column align-items-center justify-content-start">
            {type} schopnosti:
            <SkillPucksSlider puckSize={44} 
                className="d-flex mt-2" 
                iconKey={sliderId}
                currentSkill={currentSkill}
                skillLevelCb={updateRoleSkill} />
            <SkillDescription skillValue={skillIndex}/>
        </div>
    )}