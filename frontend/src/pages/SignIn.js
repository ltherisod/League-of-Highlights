import "./SignIn.css"
import Header from "../components/Header"
import { connect } from "react-redux"
import { useState } from "react"
import userActions from "../redux/actions/userActions"
import { Link } from "react-router-dom"

const SignIn = (props) => {
  const [error, setError] = useState(null)
 const [userData, setUserData] = useState({
    email: "",
    password: ""
 })
//  const [hidden, setHidden] = useState(true)

 const inputHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
}

const createHandler = async () => {
  if(userData.email === "" || userData.password === ""){
    alert("campos vacios")
    return false
  }
  try{
    const res = await props.logIn(userData)
    if(!res.success) return alert("contraseña o mail mal. o todo anda como el orto")
    alert("todo bien, iniciaste zesion altoke")
    console.log(res.response)
  }catch(e){
    alert("salio todo como el orto ")
    console.log(e)
  }
}

const showError = (e) => {
  e.preventDefault()
  const name = e.target.name
  props.signUp(userData)
  .then((response) => {
    if (!response.success) {
      let value = response.error.filter((err) => err.path[0] === name)
      if (value[0]) {
        setError(value[0].message)
      } else {
        setError(null)
      }
    } else {
      setError(null)
    }
  })
  .catch(error=> console.log(error))
}

  return (
    <>
      <Header />
      <div className="userForm" style={{backgroundImage:"url('https://i.postimg.cc/QVGzdGYs/riot-desktop-background-2x.jpg')"}}>
        <div className="formContainer">
          <h3 className="">Sign In</h3>
          <form className=" ">
           { error ? <p style={{ color: "red"}}>{error}HOLa</p>
            : null } &nbsp; 
            <div className="field">
              <label className="field__label">email</label>
              <input
                onBlur={(e) => showError(e)}
                type="text"
                onChange={inputHandler}
                id="email"
                name="email"
                className="field__form-input"
              />
            </div>
            { error ? <p style={{ color: "red"}}>{error}HOLa</p>
            : null } &nbsp; 
            <div className="field">
              <label className="field__label">password</label>
              <input
                onBlur={(e) => showError(e)}
                type="password"
                onChange={inputHandler}
                className="field__form-input password"
                name="password"
              />
            </div>
          </form>
          <div className="buttonContainer">
            <button className="login-button faceButton">
              <img src="./assets/facebook.svg" alt="facebook"/>
            </button>
            <button className="login-button googleButton">
              <img src="./assets/google.svg" alt="google"/>
            </button>
          </div>
          <button type="button" onClick={createHandler} className="login-button signIn">
            <p>Sign In</p>
          </button>
          <p className="textDataForm">Don't have an account? <Link to="/signup">Sign up here! </Link></p>
        </div>
      </div>
    </>
  )
}

const mapDispatchToprops = {
  logIn: userActions.logIn
}

export default connect(null, mapDispatchToprops)(SignIn)
