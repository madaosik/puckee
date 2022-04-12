import { Athlete, AthleteRole } from "puckee-common/types"
import { useEffect, useRef, useState } from "react"

interface GameAttendanceRoleSelectorProps {
    confirmedRole: AthleteRole | undefined
    currentUser: Athlete
    roleSelectionCb: (role: AthleteRole | undefined) => void
}

export const GameAttendanceRoleSelector = ( { confirmedRole, 
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

    return (<div ref={wrapperRef}>
                {currentUser.hasRole(AthleteRole.Player) && 
                    <span onClick={() => rememberSelected(AthleteRole.Player)}>  Hráč  </span>}
                {currentUser.hasRole(AthleteRole.Goalie) &&
                    <span onClick={() => rememberSelected(AthleteRole.Goalie)}>  Brankář  </span>}
                {currentUser.hasRole(AthleteRole.Referee) &&
                    <span onClick={() => rememberSelected(AthleteRole.Referee)}> Rozhodčí  </span>}
                <span onClick={() => rememberSelected(undefined)}> X  </span>
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