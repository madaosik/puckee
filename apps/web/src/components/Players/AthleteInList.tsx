import axios from "axios"
import { API_BASE } from "puckee-common/api"
import { Athlete, AthleteRole, IAthlete, IAthleteFollowAPI } from "puckee-common/types"
import React, { useState } from "react"
import { CgProfile } from "react-icons/cg"
import { IoPersonCircleOutline } from "react-icons/io5"
import { useMutation } from "react-query"
import { queryClient } from "../../../App"
import { AthleteListSkillRating } from "./AthleteListSkillRating"
import { FollowButton } from "./FollowButton"
import { FollowingButton } from "./FollowingButton"
import { MdGroups } from 'react-icons/md'

interface AthleteInListProps {
    currentUser: Athlete
    athleteObj: IAthlete
}

export const AthleteInList = ( {currentUser, athleteObj}: AthleteInListProps ) => {
    const athlete = new Athlete().deserialize(athleteObj)
    console.log(athlete.followers)
    const [isFollowed, setIsFollowed] = useState(athleteObj.is_followed)
    
    let config = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
      }

    const endpoint = `${API_BASE}/athlete/${currentUser.id}/follow/${athlete.id}`
    const addFollowRelMutation = useMutation((newFollowRel : IAthleteFollowAPI) => {
        return axios.post(endpoint, JSON.stringify(newFollowRel), config)
      },
        {
            onSuccess: (response) => {
                queryClient.invalidateQueries('athletes')
            },
            onError: (error) => {
                setIsFollowed(false)
                console.error(error)
            }
        }
    )

    const removeFollowRelMutation = useMutation( () => {
        return axios.delete(endpoint)
    },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('athletes')
  
            },
        onError: (error) => {
            setIsFollowed(true)
            console.error(error)
        }
    })

    const follow = () => {
        setIsFollowed(true)
        addFollowRelMutation.mutate({opt_out_mode: false})
    }
    
    const unFollow = () => {
        setIsFollowed(false)
        removeFollowRelMutation.mutate()
    }

    return (
        <div className="itemInList playersList">
            <div className="itemInList-col profilePhoto">
                <IoPersonCircleOutline size={40}/>
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
                <div className="d-flex flex-row followers">
                    <div className="mr-10"><MdGroups style={{'color': 'darkgrey'}} size={18}/></div>
                    <div>{athlete.followers}</div>
                </div>
                {athlete.is_followed ?
                    <FollowingButton unfollowCb={unFollow} sectionClass="d-flex flex-column justify-content-center"/>
                    // <FollowingButton unfollowCb={unFollow} sectionClass="container"/>
                    :
                    <FollowButton currentUser={currentUser} athlete={athlete} followCb={follow}/>
                }
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
                                            
                                            
  