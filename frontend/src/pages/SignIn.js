import "./SignIn.css"
import Header from "../components/Header"
import { connect } from "react-redux"
import { useState } from "react"
import userActions from "../redux/actions/userActions"
import { Link } from "react-router-dom"
import GoogleLogin from "react-google-login"

const SignIn = (props) => {
  const [errorEmail, setErrorEmail] = useState(null)
  const [errorPass, setErrorPass] = useState(null)
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  })

  const inputHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  const createHandler = async () => {
    if (userData.email === "" || userData.password === "") {
      alert("campos vacios")
      return false
    }
    try {
      const res = await props.logIn(userData)
      if (!res.success)
        return alert("contraseña o mail mal. o todo anda como el orto")
    } catch (e) {
      console.log(e)
    }
  }

  // const showErrorEmail = (e) => {
  //   e.preventDefault()
  //   const name = e.target.name
  //   console.log(name)
  //   props
  //     .logIn(userData)
  //     .then((response) => {
  //       console.log(response)
  //       if (!response.success) {
  //         let value = response.error.filter((err) => err.path[0] === name)
  //         if (value[0]) {
  //           setErrorEmail(value[0].message)
  //         } else {
  //           setErrorEmail(null)
  //         }
  //       } else {
  //         setErrorEmail(null)
  //       }
  //     })
  //     .catch((error) => console.log(error))
  // }

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
         alert('user doesn´t exits')
         props.history.push('/')
        } else {
          props.history.push('/community')
        }
      })
      .catch((err) => {
        console.log('cai en google catch')
        console.log(err.message)
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
            <p style={{ color: "red" }}>{errorEmail}</p>&nbsp;
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
            <p style={{ color: "red" }}>{errorPass}</p> &nbsp;
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
          <div className="buttonContainer">
            <button className="login-button faceButton">
              <img src="./assets/facebook.svg" alt="facebook" />
            </button>
            {/* <button className="login-button googleButton" 
            clientId="801642151543-tdc0cnghc9troiltr8lsquna0nd1lvin.apps.googleusercontent.com"
            >
              <img src="./assets/google.svg" alt="google"/>
            </button> */}
            <GoogleLogin
              className="login-button googleButton"
              clientId="801642151543-tdc0cnghc9troiltr8lsquna0nd1lvin.apps.googleusercontent.com"
              // buttonText="Sign Up with Google"
               onSuccess={responseGoogle}
               onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>
          <button
            type="button"
            onClick={createHandler}
            className="login-button signIn"
          >
            <p>Sign In</p>
          </button>
          <p className="textDataForm">
            Don't have an account? <Link to="/signup">Sign up here! </Link>
          </p>
        </div>
      </div>
    </>
  )
}

const mapDispatchToprops = {
  logIn: userActions.logIn,
}

export default connect(null, mapDispatchToprops)(SignIn)
