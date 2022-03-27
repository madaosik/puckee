import { useAppDispatch, useAppSelector } from "puckee-common/redux";
import { Athlete } from "puckee-common/types";
// import { signOut } from "./authSlice";

const AthleteProfile = () => {

    const { userData } = useAppSelector((state) => state.auth);
    const user = new Athlete().deserialize(userData)
    const dispatch = useAppDispatch()


    return (
        <div className="userProfileWrapper">
            <div className="userProfileBox">
                <div className="userProfileBoxContent">
                    <div className="userProfileColumn">
                        <p/>Jméno:
                        <p/>E-mail:
                        <p/>Role:
                    </div>
                    <div className="userProfileColumnValues">
                        <p/>{user.name}
                        <p/>{user.email}
                        <p/>{user.roleNames().join(', ')}
                    </div>
                </div>
                <div className="userProfileSignout">
                    {/* <div className="userProfileColumnValues"> */}
                    <button type="button" onClick={() => dispatch(signOut())}>
                        Odhlášení
                    </button>
                </div>
                {/* </div> */}
            </div>
            <div className="userProfileStats">
                <div className="userProfileHistoryHeading">
                    <h5>Odehraná utkání</h5>
                    <hr/>
                </div>
                <div className="userProfileHistoryValues">
                    <div className="userProfileHistoryValueCaptions">
                        <p>za posledních 30 dní</p>
                        <p>za posledních 90 dní</p>
                        <p>tento rok</p>
                    </div>
                    <div className="userProfileHistoryDetailedValues">
                        <p>10</p>
                        <p>40</p>
                        <p>50</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AthleteProfile