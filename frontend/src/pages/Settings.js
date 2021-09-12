import { connect } from "react-redux"
import Header from "../components/Header"
import userActions from "../redux/actions/userActions"
import { useRef } from "react"
import "./Settings.css"
import toast from "react-hot-toast"

const Settings = (props) => {
  const codeRef = useRef(null)
  const updateRef = useRef(null)

  const onVerifyCode = async () => {
    if (!codeRef.current.value) return false
    const res = await props.verifyCode(codeRef.current.value)
    if (res.success) {
      return (
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } bg-black flex`}
            style={{ display: "flex", alignContent: "center", alignItems: "center", padding: "5px 10px", borderRadius: "35px"}}
          >
            <img style={{ width: "60px", height: "60px"}}
              className="h-4 w-4 rounded-full"
              src="https://i.postimg.cc/mrHj3y29/success2.png"
              alt=""
            />
            <p className="text-sm font-medium text-white" style={{marginBottom: 0,}}>
              Your account is verified now! Welcome League of Highlights.
            </p>
          </div>
        ))
      )
    }
    toast((res.error),
      {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }
    )
  }

  const onUpdateUsername = async () => {
    if (!updateRef.current.value) return false
    const res = await props.refresh(
      updateRef.current.value,
      props.user._id,
      false
    )
    if (res.success) {
      return (
       toast.custom((t) => (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } bg-black flex`}
            style={{ display: "flex", alignContent: "center", alignItems: "center", padding: "5px 10px", borderRadius: "35px"}}
          >
            <img style={{ width: "60px", height: "60px"}}
              className="h-4 w-4 rounded-full"
              src="https://i.postimg.cc/mrHj3y29/success2.png"
              alt=""
            />
            <p className="text-sm font-medium text-white" style={{marginBottom: 0,}}>
              Username successfully updated!
            </p>
          </div>
        ))
      )
    }
    toast((res.error),
      {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }
    )
  }

  return (
    <>
      <Header {...props} />
      <div className="settingsContainer"style={{backgroundImage:"url('https://i.postimg.cc/QVGzdGYs/riot-desktop-background-2x.jpg')"}}>
        <div className="settingsDiv">
          <div>
              <h4>Update username</h4>
              <div className="field" >
                  <label className="field__label">new username</label>
                  <input
                    className="field__form-input newUser"
                    type="text"
                    ref={updateRef}
                  />
              </div>
              <button className="buttonSett" type="button" onClick={onUpdateUsername}>
               <p> Update </p>
              </button>
          </div>
            {props.user.verified ? (
              <div className="beerify">
                <h5>Your account is already verified</h5>
                <img src="https://i.postimg.cc/8cyt072j/beeHappy.png" alt="bee"/>
              </div>
            ) : (
              <div>
                <h4>Verify Account</h4>
                <div className="field">
                  <label className="field__label"> verification code</label>
                  <input
                    className="field__form-input verification"
                    ref={codeRef}
                    type="text"
                    maxLength="6"
                    minLength="6"
                  />
                </div>
               
                <button className=" buttonSett" type="button" onClick={onVerifyCode}>
                 <p> Verify </p>
                </button>
                <p className="mailverify">
                  If you haven't received an email with a verification code please{" "}
                  <a href="mailto:leagueofhighlights.2021@gmail.com">contact us.</a>
                </p>
              </div>
            )}
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  }
}

const mapDispatchToProps = {
  verifyCode: userActions.verifyCode,
  refresh: userActions.refresh,
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
