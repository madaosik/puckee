import { useAppSelector } from "puckee-common/redux"
import { Athlete, AthleteRole } from "puckee-common/types"
import { useEffect, useRef, useState } from "react"

interface GameAttendanceRoleSelectorProps {
    confirmedRole: AthleteRole | undefined
    roleSelectionCb: (role: AthleteRole | undefined) => void
}

export const GameAttendanceRoleSelector = ( { confirmedRole, roleSelectionCb } : GameAttendanceRoleSelectorProps) => {   
    const { token, userData } = useAppSelector((state) => state.auth);
    const user = new Athlete().deserialize(userData)
    const userRoles = user.getRoles()

    // console.log
    const [currentRole, setCurrentRole] = useState(confirmedRole)
    const wrapperRef = useRef(null);

    const rememberSelected = (role: AthleteRole | undefined) => {
        setCurrentRole(role)
        roleSelectionCb(role)
    }

    // if (userRoles.length <= 2) {
    //     console.log(userRoles.length)
    //     userRoles.includes(AthleteRole.Player) && roleSelectionCb(AthleteRole.Player)
    //     userRoles.includes(AthleteRole.Goalie) && roleSelectionCb(AthleteRole.Goalie)
    //     userRoles.includes(AthleteRole.Referee) && roleSelectionCb(AthleteRole.Referee)
    //     return (
    //         <div ref={wrapperRef}>
    //             <span onClick={() => rememberSelected(undefined)}> X  </span>
    //         </div>)
    // }

    const cancelCallback = () => roleSelectionCb(currentRole)
    useOutsideClickHandler(wrapperRef, cancelCallback)



    return (<div ref={wrapperRef}>
                {user.hasRole(AthleteRole.Player) && <span onClick={() => rememberSelected(AthleteRole.Player)}>  Hráč  </span>}
                {user.hasRole(AthleteRole.Goalie) && <span onClick={() => rememberSelected(AthleteRole.Goalie)}>  Brankář  </span>}
                {user.hasRole(AthleteRole.Referee) && <span onClick={() => rememberSelected(AthleteRole.Referee)}> Rozhodčí  </span>}
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