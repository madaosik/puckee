import { Link } from "react-router-dom"
import SignUpForm from "../features/auth/SignUpForm"

const SignUp = () => {
    return (
        <section className="signup">
            <p>
                <Link to="/login">&lt; zpět na přihlášení</Link>
            </p>
            <h3>Registrace</h3>
            <SignUpForm/>
        </section>
    )
}

export default SignUp