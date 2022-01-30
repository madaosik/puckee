// import { GamesList } from "../features/games/GamesList"
// import { useAppDispatch } from "../app/store"
// import { Button } from "../components"
// import { signOut } from "../features/auth/authSlice"
// import AthleteProfile from "../features/auth/AthleteProfile"
// import { signOut } from "../features/auth/authSlice"
import LoginForm from "../features/auth/LoginForm"
import { Link } from 'react-router-dom';

const Profile = () => {
    // const dispatch = useAppDispatch()

    return (
        <section className="login">
            {/* <AthleteProfile/> */}
            <h3>Jdeš do hry?</h3>
            <LoginForm/>
            <Link to="/signup">Nemám účet - chci se zaregistrovat!</Link>
        </section>
    )
}

export default Profile