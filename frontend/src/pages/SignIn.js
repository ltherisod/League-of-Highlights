import "./SignIn.css"
import Header from "../components/Header"
import { connect } from "react-redux"
import { useState } from "react"
import userActions from "../redux/actions/userActions"

const SignIn = (props) => {
 const [userData, setUserData] = useState({
    email: "",
    password: ""
 })

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
    if(!res.success) alert("contraseña o mail mal. o todo anda como el orto")
    alert("todo bien, iniciaste zesion altoke")
    console.log(res.response)
  }catch(e){
    alert("salio todo como el orto ")
    console.log(e)
  }

}

  return (
    <>
      <Header />
      <div className="userForm">
        <h3 className="">Sign in</h3>
        <form className=" ">
          <div className="">
            <input
              type="text"
              placeholder="Email"
              onChange={inputHandler}
              id="email"
              name="email"
            />
            &nbsp;
            {/* <p>Error</p> */}
          </div>
          <div className="">
            <input
              type="password"
              onChange={inputHandler}
              className=""
              placeholder="Password"
              name="password"
            />
            &nbsp;
             {/* <p>Error</p> */}
          </div>
        </form>
        <button type="button" onClick={createHandler} className="my-2 py-1 px-3  mb-4">
          <p className="fs-4 ">Sign In</p>
        </button>
      </div>
    </>
  )
}

const mapDispatchToprops = {
  logIn: userActions.logIn
}

export default connect(null, mapDispatchToprops)(SignIn)
