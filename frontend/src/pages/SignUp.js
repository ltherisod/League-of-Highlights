import "./SignUp.css"
import Header from "../components/Header"

const SignUp = () => {
    return (
        <>
            <Header/>
            <div className="userForm">
                <h3>Sign Up</h3>
                <form>
                    {/* <p>Error</p> */}
                     &nbsp;
                    <input type="text" placeholder="First name" name="firstName" autoComplete="nope"/>
                    {/* <p>Error</p>  */}
                    &nbsp;
                    <input type="text" placeholder="Email" name="email" autoComplete="nope"/>
                    {/* <p>Error</p> */}
                     &nbsp;
                    <input type="password" placeholder="Password" name="password" autoComplete="nope"/>
                </form>
                <button>Create account</button>
                <button>Sign Up with Google</button>
            </div>

            <div className="riot">
                <h3>Do you have a Riot account?</h3>
                <div className="options">
                    <button>Yes</button>
                    <button>No</button>
                </div>
                <form>
                    <input type="text" placeholder="Username" name="username"/>
                    {/* <input type="text" placeholder="icon" name="icon" />
                    input condicional  */}
                    <button>Send</button>
                </form>

            </div>
        </>
    )
}

export default SignUp