import { Athlete, AthleteRole, Game } from "puckee-common/types"
import React, { SVGProps, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { GoalieIcon, PlayerIcon } from "../../Icons"
import { RoleIconSelector } from "./RoleIconSelector"

interface GameAttendanceRoleSelectorProps {
    game: Game
    isInvertedColor: boolean
    confirmedRole: AthleteRole | undefined
    currentUser: Athlete
    roleSelectionCb: (role: AthleteRole | undefined) => void
}

export const GameAttendanceRoleSelector = ( { game,
                                              isInvertedColor,
                                              confirmedRole, 
                                              currentUser, 
                                              roleSelectionCb } 
                                              : GameAttendanceRoleSelectorProps) => {

    // If user has just one role assigned, it is actually not needed to render this component, so state of the
    // parent component is updated accordingly
    var uniqueUserRole = currentUser.uniqueRole()
    uniqueUserRole && roleSelectionCb(uniqueUserRole)
  
    const [currentRole, setCurrentRole] = useState(confirmedRole)
    const wrapperRef = useRef(null);

    const rememberSelected = (role: AthleteRole | undefined) => {
        setCurrentRole(role)
        roleSelectionCb(role)
    }

    const cancelCallback = () => roleSelectionCb(currentRole)
    useOutsideClickHandler(wrapperRef, cancelCallback)

    return (<div ref={wrapperRef} className="d-flex flex-row">
                { 
                  currentUser.hasRole(AthleteRole.Player) && 
                    <RoleIconSelector game={game} role={AthleteRole.Player} RoleIcon={PlayerIcon} rememberSelectedCb={rememberSelected} isInvertedColor={isInvertedColor}/>
                }
                { 
                  currentUser.hasRole(AthleteRole.Goalie) && 
                    <RoleIconSelector game={game} role={AthleteRole.Goalie} RoleIcon={GoalieIcon} rememberSelectedCb={rememberSelected} isInvertedColor={isInvertedColor}/>
                }
                { 
                  currentUser.hasRole(AthleteRole.Referee) &&
                    <RoleIconSelector game={game} role={AthleteRole.Referee} RoleIcon={GoalieIcon} rememberSelectedCb={rememberSelected} isInvertedColor={isInvertedColor}/>
                }
            </div>
    )
}

function useOutsideClickHandler(ref : any, callBack: () => void) {
    useEffect(() => {
        function handleClickOutside(event: any) {
          if (ref.current && !ref.current.contains(event.target)) {
            callBack()
          }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [ref]);
}