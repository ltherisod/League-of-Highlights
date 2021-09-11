import { connect } from "react-redux"
import Header from "../components/Header"
import userActions from "../redux/actions/userActions"
import { useRef } from "react"

const Settings = (props) => {
  const codeRef = useRef(null)
  const updateRef = useRef(null)

  const onVerifyCode = async () => {
    if (!codeRef.current.value) return false
    const res = await props.verifyCode(codeRef.current.value)
    if (res.success) {
      alert("Your account is verified now! Welcome League of Highlights.")
      return true
    }
    alert(res.error)
  }

  const onUpdateUsername = async () => {
    if (!updateRef.current.value) return false
    const res = await props.refresh(
      updateRef.current.value,
      props.user._id,
      false
    )
    if (res.success) {
      alert("Username actualizado correctamente!")
      return true
    }
    alert(res.error)
  }

  return (
    <>
      <Header {...props} />
      <div>
        <div>
          <h4>Update username</h4>
          <input
            type="text"
            ref={updateRef}
            placeholder="Enter your new username"
          />
          <button type="button" onClick={onUpdateUsername}>
            Update
          </button>
        </div>
        {props.user.verified ? (
          <h5>Your account is already verified :)</h5>
        ) : (
          <div>
            <h4>Verify Account</h4>
            <input
              ref={codeRef}
              type="text"
              placeholder="Verification Code"
              maxLength="6"
              minLength="6"
            />
            <button type="button" onClick={onVerifyCode}>
              Verify
            </button>
            <p>
              If you haven't received an email with a verification code please{" "}
              <a href="mailto:leagueofhighlights.2021@gmail.com">contact us.</a>
            </p>
          </div>
        )}
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
