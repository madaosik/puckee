import { AthleteRole } from "puckee-common/types"
import React, { useEffect, useState, MouseEventHandler } from "react"
import { ChangeablePuck } from "./Puck"
import { SkillPucksProps } from "./SkillPucks"


interface DynamicSkillPucksProps extends SkillPucksProps {
    currentSkill: number,
    skillLevelCb: (value: number) => void
  }
  
export const SkillPucksSlider = ( { puckSize, iconKey, className, currentSkill, skillLevelCb} : DynamicSkillPucksProps ) => {
    
    const [selectedSkill, setSelectedSkill] = useState(currentSkill)

    const updatePucks = (value : number) : any => {
      setSelectedSkill(value)
      skillLevelCb(value)
    }

    let levelPucks: JSX.Element[] = []
  
    for(let i= 1; i < 7; i++) 
    {
      if (i < selectedSkill + 1) {
          levelPucks.push(<ChangeablePuck size={puckSize} active={true}
              key={iconKey + ":level" + i} index={i} onClickCb={updatePucks}/>)
      } else {
          levelPucks.push(<ChangeablePuck size={puckSize} active={false}
              key={iconKey + ":level" + i} index={i} onClickCb={updatePucks}/>)
      }
    }
  
    return (
      <div className={className}>
        {levelPucks}
      </div>
    )
  }
  