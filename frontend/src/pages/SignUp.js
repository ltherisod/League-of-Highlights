import "./SignUp.css"
import Header from "../components/Header"
import { connect } from "react-redux"
import userActions from "../redux/actions/userActions"
import { useRef, useState } from "react"
//import { ref } from "joi"
import championsActions from "../redux/actions/championsActions"
import { Link } from "react-router-dom"
import GoogleLogin from "react-google-login"

const SignUp = (props) => {
  props.getChampionsRotation()
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
  //const iconRef = useRef()
  const [userId, setUserId] = useState("")

  // Utils
  const inputHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  const createHandler = async () => {
    if (Object.values(userData).some((value) => value === "")) {
      return false //poner alerta que llene los campos
    }
    const res = await props.signUp(userData)
    if (res.success) {
      setUserId(res.response._id)
      setStep(2)
    } else {
      alert("Something went wrong! Please try later.") //cambiar alert feo
      console.log(res.error) // Manejar el error acá.
    }
  }

  const responseGoogle = (res) => {
    let googleUser = {
      name: res.profileObj.givenName,
      email: res.profileObj.email,
      password: res.profileObj.googleId,
      googleFlag: true,
    }
    props
      .signUp(googleUser)
      .then((response) => {
        if (response.success) {
          setUserId(response.response._id)
          setStep(2)
        } else {
          throw new Error(response.error)
        }
      })
      .catch((error) => {
        alert(error)
      })
  }

  const refreshHandler = async () => {
    if (!usernameRef.current.value) return alert('empty fields') // Completa los campos flojo de mierda.
    const res = await props.refresh(
      usernameRef.current.value,
      userId,
      !hasRiotAccount
    )
    if (res.success) {
      props.loginLS(localStorage.getItem("token"))

    }else{
      alert(res)
    } // Evaluar res.success... si es false, puede ser un error interno, de comunicación, o!!! PUEDE SER QUE EL USUARIO YA EXISTA.
  }
  return (
    <>
      <Header />
      {step === 1 && (
        <div
          className="userForm"
          style={{
            backgroundImage:
              "url('https://i.postimg.cc/QVGzdGYs/riot-desktop-background-2x.jpg')",
          }}
        >
          <div className="formContainer">
            <h3>Sign Up</h3>
            <form>
              {/* <small style={{ color: "red" }}>{error}&nbsp;</small> */}
              <div className="field">
                <label className="field__label">name</label>
                <input
                  type="text"
                  // onBlur={(e) => showError(e)}
                  onChange={inputHandler}
                  name="name"
                  className="field__form-input name"
                  autoComplete="nope"
                />
              </div>
              {/* <small style={{ color: "red" }}>{errorEmail}&nbsp;</small> */}
              <div className="field">
                <label className="field__label">email</label>
                <input
                  type="text"
                  // onBlur={(e) => showErrorEmail(e)}
                  onChange={inputHandler}
                  name="email"
                  className="field__form-input email"
                  autoComplete="nope"
                />
              </div>
              {/* <small style={{ color: "red" }}>{errorPass}&nbsp;</small> */}
              <div className="field">
                <label className="field__label">password</label>
                <input
                  type="password"
                  // onBlur={(e) => showErrorPass(e)}
                  onChange={inputHandler}
                  name="password"
                  className="field__form-input password"
                  autoComplete="nope"
                />
              </div>
            </form>
            <div className="buttonContainer">
              <button className="login-button faceButton">
                <img src="./assets/facebook.svg" alt="facebook" />
              </button>
              {/* <button className="login-button googleButton" > */}
              {/* <img src="./assets/google.svg" alt="google"/> */}
              <GoogleLogin
                className="login-button googleButton"
                clientId="801642151543-tdc0cnghc9troiltr8lsquna0nd1lvin.apps.googleusercontent.com"
                // buttonText="Sign Up with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />

              {/* </button> */}
            </div>
            <button onClick={createHandler} className="login-button signIn">
              <p>Sign Up</p>
            </button>
            <p className="textDataForm">
              Already have an account? <Link to="/signin">Sign in here! </Link>
            </p>
          </div>
        </div>
      )}

      {step === 2 && (
        <div
          className="userForm riot"
          style={{
            backgroundImage:
              "url('https://i.postimg.cc/QVGzdGYs/riot-desktop-background-2x.jpg')",
          }}
        >
          <div className="formContainer">
            <h3>Do you have a Riot account?</h3>
            <div className="options">
              <button
                className="buttonRiot riotYes"
                onClick={() => setHasRiotAccount(true)}
              >
                Yes
              </button>
              <button
                className="buttonRiot riotNo"
                onClick={() => setHasRiotAccount(false)}
              >
                No
              </button>
            </div>
            <form>
              {hasRiotAccount === true && (
                <>
                  <div className="field">
                    <label className="field__label">username</label>
                    <input
                      ref={usernameRef}
                      type="text"
                      name="username"
                      className="field__form-input username"
                    />
                  </div>
                  <button
                    className="riotIcon"
                    type="button"
                    onClick={refreshHandler}
                  >
                    <img alt="riot" src="./assets/riot.png" />
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
        </div>
      )}
    </>
  )
}

const mapDispatchToprops = {
  getChampionsRotation: championsActions.getChampionsRotation,
  signUp: userActions.signUp,
  refresh: userActions.refresh,
  loginLS: userActions.loginLS,
}

export default connect(null, mapDispatchToprops)(SignUp)
