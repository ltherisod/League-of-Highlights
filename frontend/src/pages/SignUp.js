import "./SignUp.css"
import Header from "../components/Header"
import { connect } from "react-redux"
import userActions from "../redux/actions/userActions"
import { useRef, useState } from "react"
import { ref } from "joi"

const SignUp = (props) => {
  const [step, setStep] = useState(1)

  // step 1
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  })

  // step 2
  const [hasRiotAccount, setHasRiotAccount] = useState(null)
  const usernameRef = useRef()
  const iconRef = useRef()
  const [userId, setUserId] = useState("")

  // Utils
  const inputHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  const createHandler = async () => {
    if (Object.values(userData).some((value) => value === "")) {
      return false
    }
    const res = await props.signUp(userData)
    if (res.success) {
      setUserId(res.response._id)
      setStep(2)
    } else {
      console.log(res.error) // Manejar el error acá.
    }
  }

  const refreshHandler = async () => {
    if (!usernameRef.current.value) return false // Completa los campos flojo de mierda.
    const res = await props.refresh(
      usernameRef.current.value,
      userId,
      !hasRiotAccount
    )
    console.log(res.response)
  }
  return (
    <>
      <Header />
      {step === 1 && (
        <div className="userForm" style={{backgroundImage:"url('https://i.postimg.cc/QVGzdGYs/riot-desktop-background-2x.jpg')"}}>
          <h3>Sign Up</h3>
          <form>
            {/* <p>Error</p> */}
            &nbsp;
            <input
              type="text"
              placeholder="Name"
              onChange={inputHandler}
              name="name"
              autoComplete="nope"
            />
            {/* <p>Error</p>  */}
            &nbsp;
            <input
              type="text"
              placeholder="Email"
              onChange={inputHandler}
              name="email"
              autoComplete="nope"
            />
            {/* <p>Error</p> */}
            &nbsp;
            <input
              type="password"
              placeholder="Password"
              onChange={inputHandler}
              name="password"
              autoComplete="nope"
            />
          </form>
          <button onClick={createHandler}>Create account</button>
          <button>Sign Up with Google</button>
        </div>
      )}

      {step === 2 && (
        <div className="riot">
          <h3>Do you have a Riot account?</h3>
          <div className="options">
            <button onClick={() => setHasRiotAccount(true)}>Yes</button>
            <button onClick={() => setHasRiotAccount(false)}>No</button>
          </div>
          <form>
            {hasRiotAccount === true && (
              <>
                <input
                  ref={usernameRef}
                  type="text"
                  placeholder="Username"
                  name="username"
                />
                <button type="button" onClick={refreshHandler}>
                  Tiene cuenta riot
                </button>
              </>
            )}
            {hasRiotAccount === false && (
              <>
                <input type="text" placeholder="Icon" name="icon" />
                <button>No tiene cuenta riot</button>
              </>
            )}
            {/* <input type="text" placeholder="icon" name="icon" />
                    input condicional  */}
          </form>
        </div>
      )}
    </>
  )
}

const mapDispatchToprops = {
  signUp: userActions.signUp,
  refresh: userActions.refresh,
}

export default connect(null, mapDispatchToprops)(SignUp)
