import { assertJSXSpreadChild } from "@babel/types"
import { roundToNearestMinutes } from "date-fns"
import { useAppSelector } from "puckee-common/redux"
import { Athlete, AthleteRole, IAthlete } from "puckee-common/types"
import React from "react"
import { CgProfile } from "react-icons/cg"
import { IoMdArrowDropright } from "react-icons/io"
import { Link } from "react-router-dom"
import { SkillPucks } from "../SkillPucks/SkillPucks"
import { AthleteListSkillRating } from "./AthleteListSkillRating"


interface AthleteInListProps {
    athleteObj: IAthlete
}

export const AthleteInList = ( {athleteObj}: AthleteInListProps ) => {
    console.log(athleteObj)
    const athlete = new Athlete().deserialize(athleteObj)
    const athleteRoles = athlete.roles
    
    return (
        <div className="itemInList playersList">
            <div className="itemInList-col profilePhoto">
                <CgProfile size={40}/>
            </div>
            <div className="itemInList-col athleteName">
                {athlete.name}
            </div>
            <div className="itemInList-col athleteSkills">
                {athlete.hasRole(AthleteRole.Player) && 
                    <AthleteListSkillRating athlete={athlete} displayedRole={AthleteRole.Player} />}
                {athlete.hasRole(AthleteRole.Goalie) && 
                    <AthleteListSkillRating athlete={athlete} displayedRole={AthleteRole.Goalie} />}
                {/* Skill is not displayed for the referee role */}
                {athlete.hasRole(AthleteRole.Referee) && 
                    <AthleteListSkillRating athlete={athlete} displayedRole={AthleteRole.Referee} />}
            </div>
            <div className="itemInList-col athleteAttendance">
            </div>
            <div className="itemInList-col athleteFollowStatus">
            </div>
        {/* <div className="itemInList-col detailArrow">
            <Link to={"#"}><IoMdArrowDropright size={30}/></Link>
        </div> */}
    </div>
    

    
    // <p
    //     style={{
    //         border: '1px solid gray',
    //         borderRadius: '5px',
    //         padding: '2rem 1rem',
    //         background: `hsla(${athlete.id * 30}, 60%, 80%, 1)`,
    //     }}
    //     key={athlete.id}
    //     >
    //     {athlete.name}
    //     {/* {game.date} */}
    // </p>
    )
}
                                            
                                            
  