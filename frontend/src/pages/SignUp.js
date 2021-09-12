import "./SignUp.css"
import Header from "../components/Header"
import { connect } from "react-redux"
import userActions from "../redux/actions/userActions"
import { useRef, useState,useEffect } from "react"
import championsActions from "../redux/actions/championsActions"
import { Link } from "react-router-dom"
import GoogleLogin from "react-google-login"
import toast, { Toaster } from "react-hot-toast"

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
  const [errorName, setErrorName] = useState(null)
  const [errorEmail, setErrorEmail] = useState(null)
  const [errorPass, setErrorPass] = useState(null)
  const [disableButton,setDisableButton]=useState(false)

  // Utils
  const inputHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  const toTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    toTop()
    // eslint-disable-next-line
  }, [])

  const createHandler = async () => {
    if (Object.values(userData).some((value) => value === "")) {
      return toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } bg-black flex`}
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            padding: "5px 10px",
            borderRadius: "35px",
          }}
        >
          <img
            style={{ width: "60px", height: "60px" }}
            className="h-4 w-4 rounded-full"
            src="https://i.postimg.cc/9Q6BYPNR/varusfacepalm.png"
            alt=""
          />
          <p
            className="text-sm font-medium text-white"
            style={{ marginBottom: 0 }}
          >
            Please complete all the fields!
          </p>
        </div>
      ))
    }
    try {
      setDisableButton(true)
      const res = await props.signUp(userData)
     
      if (res.success) {
        setDisableButton(false)
        setUserId(res.response._id)
        setStep(2)
      } else {
        setDisableButton(false)
        if (res.error === "Network Error") {
          toast.custom((t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } bg-black flex`}
              style={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                padding: "5px 10px",
                borderRadius: "35px",
              }}
            >
              <img
                style={{ width: "60px", height: "60px" }}
                className="h-4 w-4 rounded-full"
                src="https://i.postimg.cc/g2dLtyDR/logOut.png"
                alt=""
              />
              <p
                className="text-sm font-medium text-white"
                style={{ marginBottom: 0 }}
              >
                {res.error}
              </p>
            </div>
          ))
          props.history.push("/")
        } else if (res.error === "Email already in use!") {
          toast.custom((t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } bg-black flex`}
              style={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                padding: "5px 10px",
                borderRadius: "35px",
              }}
            >
              <img
                style={{ width: "60px", height: "60px" }}
                className="h-4 w-4 rounded-full"
                src="https://i.postimg.cc/g2dLtyDR/logOut.png"
                alt=""
              />
              <p
                className="text-sm font-medium text-white"
                style={{ marginBottom: 0 }}
              >
                {res.error}
              </p>
            </div>
          ))
        } else {
          setErrorName(
            res.error.find((err) => err.path[0] === "name")
              ? res.error.find((err) => err.path[0] === "name").message
              : null
          )
          setErrorEmail(
            res.error.find((err) => err.path[0] === "email")
              ? res.error.find((err) => err.path[0] === "email").message
              : null
          )
          setErrorPass(
            res.error.find((err) => err.path[0] === "password")
              ? res.error.find((err) => err.path[0] === "password").message
              : null
          )
        }
      }
    } catch (error) {
      setDisableButton(false)
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } bg-black flex`}
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            padding: "5px 10px",
            borderRadius: "35px",
          }}
        >
          <img
            style={{ width: "60px", height: "60px" }}
            className="h-4 w-4 rounded-full"
            src="https://i.postimg.cc/g2dLtyDR/logOut.png"
            alt=""
          />
          <p
            className="text-sm font-medium text-white"
            style={{ marginBottom: 0 }}
          >
            {error}
          </p>
        </div>
      ))
      
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
          toast.custom((t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } bg-black flex`}
              style={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                padding: "5px 10px",
                borderRadius: "35px",
              }}
            >
              <img
                style={{ width: "60px", height: "60px" }}
                className="h-4 w-4 rounded-full"
                src="https://i.postimg.cc/g2dLtyDR/logOut.png"
                alt=""
              />
              <p
                className="text-sm font-medium text-white"
                style={{ marginBottom: 0 }}
              >
                {response.error}
              </p>
            </div>
          ))
        }
      })
      .catch((error) => {
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } bg-black flex`}
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              padding: "5px 10px",
              borderRadius: "35px",
            }}
          >
            <img
              style={{ width: "60px", height: "60px" }}
              className="h-4 w-4 rounded-full"
              src="https://i.postimg.cc/g2dLtyDR/logOut.png"
              alt=""
            />
            <p
              className="text-sm font-medium text-white"
              style={{ marginBottom: 0 }}
            >
              {error}
            </p>
          </div>
        ))
      })
  }

  const refreshHandler = async () => {
    try {
      if (!usernameRef.current.value) {
        return toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } bg-black flex`}
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              padding: "5px 10px",
              borderRadius: "35px",
            }}
          >
            <img
              style={{ width: "60px", height: "60px" }}
              className="h-4 w-4 rounded-full"
              src="https://i.postimg.cc/9Q6BYPNR/varusfacepalm.png"
              alt=""
            />
            <p
              className="text-sm font-medium text-white"
              style={{ marginBottom: 0 }}
            >
              empty fields!
            </p>
          </div>
        ))
      }

      const res = await props.refresh(
        usernameRef.current.value,
        userId,
        !hasRiotAccount
      )
      if (res.success ) {
        props.loginLS(localStorage.getItem("token"))
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } bg-black flex`}
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              padding: "5px 10px",
              borderRadius: "35px",
            }}
          >
            <img
              style={{ width: "60px", height: "60px" }}
              className="h-4 w-4 rounded-full"
              src="https://i.postimg.cc/mrHj3y29/success2.png"
              alt=""
            />
            <p
              className="text-sm font-medium text-white"
              style={{ marginBottom: 0 }}
            >
              Welcome!
            </p>
          </div>
        ))
      } else {
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } bg-black flex`}
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              padding: "5px 10px",
              borderRadius: "35px",
            }}
          >
            <img
              style={{ width: "60px", height: "60px" }}
              className="h-4 w-4 rounded-full"
              src="https://i.postimg.cc/g2dLtyDR/logOut.png"
              alt=""
            />
            <p
              className="text-sm font-medium text-white"
              style={{ marginBottom: 0 }}
            >
              {res.error}
            </p>
          </div>
        ))
      }
    } catch (error) {
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } bg-black flex`}
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            padding: "5px 10px",
            borderRadius: "35px",
          }}
        >
          <img
            style={{ width: "60px", height: "60px" }}
            className="h-4 w-4 rounded-full"
            src="https://i.postimg.cc/g2dLtyDR/logOut.png"
            alt=""
          />
          <p
            className="text-sm font-medium text-white"
            style={{ marginBottom: 0 }}
          >
            {error}
          </p>
        </div>
      ))
    }
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
              <small style={{ color: "red" }}>{errorName}&nbsp;</small>
              <div className="field">
                <label className="field__label">name</label>
                <input
                  type="text"
                  onChange={inputHandler}
                  name="name"
                  className="field__form-input name"
                  autoComplete="nope"
                />
              </div>
              <small style={{ color: "red" }}>{errorEmail}&nbsp;</small>
              <div className="field">
                <label className="field__label">email</label>
                <input
                  type="text"
                  onChange={inputHandler}
                  name="email"
                  className="field__form-input email"
                  autoComplete="nope"
                />
              </div>
              <small style={{ color: "red" }}>{errorPass}&nbsp;</small>
              <div className="field">
                <label className="field__label">password</label>
                <input
                  type="password"
                  onChange={inputHandler}
                  name="password"
                  className="field__form-input password"
                  autoComplete="nope"
                />
              </div>
            </form>
            {/* <button className="login-button googleButton" > */}
            {/* <img src="./assets/google.svg" alt="google"/> */}
            {/* <div className="buttonContainer"> */}
            <div className="container">
              <div className="row">
                <div className="col-xs-12 col-sm-6">
                  <div className="d-flex justify-content-center align-items-center">
                    <button onClick={createHandler} className="sessionButton" disabled={disableButton}>
                      <span>Sign Up</span>
                    </button>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-6">
                  <div className="d-flex justify-content-center align-items-center">
                    <GoogleLogin
                      className="googleButton"
                      clientId="801642151543-38r3g1i2708m0o5ianjqsq43fd07cfrt.apps.googleusercontent.com"
                      buttonText="Sign up with Google"
                      onSuccess={responseGoogle}
                      onFailure={responseGoogle}
                      cookiePolicy={"single_host_origin"}
                    />
                  </div>
                </div>
              </div>
            </div>
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
                onClick={() => props.loginLS(localStorage.getItem("token"))}
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
            </form>
          </div>
        </div>
      )}
      <Toaster
        containerStyle={{
          top: 80,
          left: 20,
          bottom: 20,
          right: 20,
        }}
        toastOptions={{
          duration: 1500,
        }}
      />
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
