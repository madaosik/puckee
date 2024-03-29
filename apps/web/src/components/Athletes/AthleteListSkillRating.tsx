import { Athlete, AthleteRole } from "puckee-common/types"
import React from "react"
import { SkillPucks } from "../SkillPucks/SkillPucks"
import { IoPersonOutline } from 'react-icons/io5'
import { GoalieIcon, PlayerIcon } from "../../Icons"

interface AthleteListSkillRatingProps {
    athlete: Athlete
    displayedRole: AthleteRole
}

export const AthleteListSkillRating = ( { athlete, displayedRole} : AthleteListSkillRatingProps) => {
    // TODO Implement evaluation count fetching and store it in this component
    // if(displayedRole == AthleteRole.Referee) {
    //     return <></>
    // }

    const skillRating = athlete.roleSkill(displayedRole)

    return (
        <div className="d-flex flex-row skillRows">
                <div className="d-flex flex-row evaluation">
                    <div className="d-flex flex-row endorsersCnt">0</div>
                    
                    <div className="d-flex flex-row endorsersIcon">
                        <IoPersonOutline size={14} color={'darkgrey'}/>
                    </div>
                </div>


                <div className="d-flex flex-row rating">
                    <div className="avgRating">
                        {skillRating.toFixed(2)}
                    </div>
                    
                    <div className="skillPucks">
                        {
                            (displayedRole == AthleteRole.Player || displayedRole == AthleteRole.Goalie)
                            &&
                            <SkillPucks skillLevel={Math.round(skillRating)} puckSize={18} 
                            iconKey={`player-${athlete.id}--${displayedRole}-puck`}/>
                        }
                    </div>
                </div>

                <div className="d-flex flex-row justify-content-center roleIcon">
                    {displayedRole == AthleteRole.Player && <div><PlayerIcon color="#002D63" height={18}/></div>}
                    {displayedRole == AthleteRole.Goalie && <div><GoalieIcon color="#002D63" height={18}/></div>}
                </div>
        </div>
    )
}