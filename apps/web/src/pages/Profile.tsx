// import { GamesList } from "../features/games/GamesList"
// import { useAppDispatch } from "../app/store"
// import { Button } from "../components"
// import { signOut } from "../features/auth/authSlice"
import AthleteProfile from "../features/auth/AthleteProfile"
// import { signOut } from "../features/auth/authSlice"

const Profile = () => {
    // const dispatch = useAppDispatch()

    return (
        <section className="profile">
            <h3>Statistiky &amp; profil</h3>
            <AthleteProfile/>
        </section>
    )
}

export default Profile