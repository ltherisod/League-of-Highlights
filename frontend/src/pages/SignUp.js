import "./SignUp.css"
import Header from "../components/Header"
import { connect } from "react-redux"
import userActions from "../redux/actions/userActions"
import { useRef, useState } from "react"
import { ref } from "joi";
import championsActions from "../redux/actions/championsActions"
import { Link } from "react-router-dom"

const SignUp = (props) => {
  props.getChampionsRotation();
  const [step, setStep] = useState(1);
  const [error, setError] = useState(null)

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
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  const createHandler = async () => {
    if (Object.values(userData).some((value) => value === "")) {
      return false
    }
    const res = await props.signUp(userData);
    if (res.success) {
      setUserId(res.response._id);
      setStep(2);
    } else {
      console.log(res.error); // Manejar el error acá.
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

  const refreshHandler = async () => {
    if (!usernameRef.current.value) return false; // Completa los campos flojo de mierda.
    const res = await props.refresh(
      usernameRef.current.value,
      userId,
      !hasRiotAccount
    )
    console.log(res) // Evaluar res.success... si es false, puede ser un error interno, de comunicación, o!!! PUEDE SER QUE EL USUARIO YA EXISTA.
  }
  return (
    <>
      <Header />
      {step === 1 && (
        <div className="userForm" style={{backgroundImage:"url('https://i.postimg.cc/QVGzdGYs/riot-desktop-background-2x.jpg')"}}>
              <div className="formContainer">
              <h3>Sign Up</h3>
                <form>
                <p style={{ color: "red" }}>{error}</p>&nbsp;
                  <div className="field">
                    <label class="field__label">name</label>
                      <input
                        type="text"
                        onBlur={(e) => showError(e)}
                        onChange={inputHandler}
                        name="name"
                        className="field__form-input name"
                        autoComplete="nope"
                      />
                  </div>
                     <p style={{ color: "red" }}>{error}</p>&nbsp;
                  <div className="field">
                    <label class="field__label">email</label>
                    <input
                      type="text"
                      onBlur={(e) => showError(e)}
                      onChange={inputHandler}
                      name="email"
                      className="field__form-input email"
                      autoComplete="nope"
                    />
                  </div>
                  <p style={{ color: "red" }}>{error}</p>&nbsp;
                  <div className="field">
                  <label class="field__label">password</label>
                    <input
                      type="password"
                      onBlur={(e) => showError(e)}
                      onChange={inputHandler}
                      name="password"
                      className="field__form-input password"
                      autoComplete="nope"
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
                <button onClick={createHandler} className="login-button signIn">
                  <p>Sign Up</p>
                  </button>
                <p className="textDataForm">Already have an account? <Link to="/signin">Sign in here! </Link></p>
            </div>
          </div>
        )}
            

        {step === 2 && (
          <div className="userForm riot" style={{backgroundImage:"url('https://i.postimg.cc/QVGzdGYs/riot-desktop-background-2x.jpg')"}}>
            <div className="formContainer">
                <h3>Do you have a Riot account?</h3>
                <div className="options">
                  <button className="buttonRiot riotYes"onClick={() => setHasRiotAccount(true)}>
                    Yes
                    </button>
                  <button  className="buttonRiot riotNo" onClick={() => setHasRiotAccount(false)}>
                    No
                  </button>
                </div>
                <form>
                    {hasRiotAccount === true && (
                      <>
                        <div className="field">
                            <label class="field__label">username</label>
                            <input
                              ref={usernameRef}
                              type="text"
                              name="username"
                              className="field__form-input username"
                            />
                        </div>
                        <button className="riotIcon"type="button" onClick={refreshHandler}>
                            <img alt="riot" src="./assets/riot.png"/>
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
  );
};

const mapDispatchToprops = {
  getChampionsRotation: championsActions.getChampionsRotation,
  signUp: userActions.signUp,
  refresh: userActions.refresh,
};

export default connect(null, mapDispatchToprops)(SignUp);
