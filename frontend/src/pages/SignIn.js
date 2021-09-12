import "./SignIn.css"
import Header from "../components/Header"
import { connect } from "react-redux"
import { useState, useEffect } from "react"
import userActions from "../redux/actions/userActions"
import { Link } from "react-router-dom"
import GoogleLogin from "react-google-login"
import toast, { Toaster } from "react-hot-toast"

const SignIn = (props) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  })
  const [disableButton,setDisableButton]=useState(false)

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
  },[])

  const inputHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  const createHandler = async () => {
    if (userData.email === "" || userData.password === "") {
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
      return false
    }
    try {
      setDisableButton(true)
      const res = await props.logIn(userData)
      if (!res.success) {
        setDisableButton(false)
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
              src="https://i.postimg.cc/Y2JPJ0TM/success.png"
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
      setDisableButton(false)
    }
  }

  const responseGoogle = (response) => {
    let user = {
      email: response.profileObj.email,
      password: response.profileObj.googleId,
      googleFlag: true,
    }
    props
      .logIn(user)
      .then((res) => {
        if (!res.success) {
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
      })
      .catch((err) => {
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
              {err.message}
            </p>
          </div>
        ))
      })
  }

  return (
    <>
      <Header />
      <div
        className="userForm"
        style={{
          backgroundImage:
            "url('https://i.postimg.cc/QVGzdGYs/riot-desktop-background-2x.jpg')",
        }}
      >
        <div className="formContainer">
          <h3 className="">Sign In</h3>
          <form className=" ">
            {/* <p style={{ color: "red" }}>{errorEmail}</p>&nbsp; */}
            <div className="field">
              <label className="field__label">email</label>
              <input
                // onBlur={(e) => showErrorEmail(e)}
                type="text"
                onChange={inputHandler}
                id="email"
                name="email"
                className="field__form-input email"
              />
            </div>
            {/* <p style={{ color: "red" }}>{errorPass}</p> &nbsp; */}
            <div className="field">
              <label className="field__label">password</label>
              <input
                // onBlur={(e) => showErrorPass(e)}
                type="password"
                onChange={inputHandler}
                className="field__form-input password"
                name="password"
              />
            </div>
          </form>
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-6">
                <div className="d-flex justify-content-center align-items-center">
                  <button
                    type="button"
                    onClick={createHandler}
                    disabled={disableButton}
                    // className="login-button signIn"
                    className="sessionButton"
                  >
                    {/* <p>Sign In</p> */}
                    <span className="">Sign In</span>
                  </button>
                </div>
              </div>
              <div className="col-xs-12 col-sm-6">
                <div className="d-flex justify-content-center align-items-center">
                  <GoogleLogin
                    // className="login-button googleButton "
                    className="googleButton"
                    clientId="801642151543-tdc0cnghc9troiltr8lsquna0nd1lvin.apps.googleusercontent.com"
                    buttonText="Sign in with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={"single_host_origin"}
                  />
                </div>
              </div>
            </div>
          </div>
          <p className="textDataForm">
            Don't have an account? <Link to="/signup">Sign up here! </Link>
          </p>
        </div>
      </div>
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
  logIn: userActions.logIn,
}

export default connect(null, mapDispatchToprops)(SignIn)
