import { AthleteRole } from "puckee-common/types"
import { useEffect, useRef, useState } from "react"

interface GameAttendanceRoleSelectorProps {
    confirmedRole: AthleteRole | undefined
    roleSelectionCb: (role: AthleteRole | undefined) => void
}

export const GameAttendanceRoleSelector = ( { confirmedRole, roleSelectionCb } : GameAttendanceRoleSelectorProps) => {   
    console.log(confirmedRole)
    const [currentRole, setCurrentRole] = useState(confirmedRole)
    
    const wrapperRef = useRef(null);

    const cancelCallback = () => {
        // setCurrentRole()
        console.log(currentRole)
        roleSelectionCb(currentRole)
    }

    const rememberSelected = (role: AthleteRole | undefined) => {
        setCurrentRole(role)
        roleSelectionCb(role)
    }

    useOutsideAlerter(wrapperRef, cancelCallback);

    return (<div ref={wrapperRef}>
                <span onClick={() => rememberSelected(AthleteRole.Player)}>  Hráč  </span>
                <span onClick={() => rememberSelected(AthleteRole.Goalie)}>  Brankář  </span>
                <span onClick={() => rememberSelected(AthleteRole.Referee)}> Rozhodčí  </span>
                <span onClick={() => rememberSelected(undefined)}> X  </span>
            </div>
    )
}

function useOutsideAlerter(ref : any, callBack: () => void) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event: any) {
          if (ref.current && !ref.current.contains(event.target)) {
            // alert("You clicked outside of me!");
            // console.log(currentRole)
            callBack()
          }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [ref]);
}