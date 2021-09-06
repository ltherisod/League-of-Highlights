import "./SignIn.css"
import Header from "../components/Header"

const SignIn = () => {
  return (
    <>
      <Header />
      <div className="userForm">
        <h3 className="">Sign in</h3>
        <form className=" ">
          <div className="">
            <input
              className=" "
              type="text"
              placeholder="Email"
              id="email"
              name="email"
            />
            &nbsp;
            {/* <p>Error</p> */}
          </div>
          <div className="">
            <input
              type="password"
              className=""
              placeholder="Password"
              name="password"
            />
            &nbsp;
             {/* <p>Error</p> */}
          </div>
        </form>
        <button className="">
          <p className="fs-4 ">Sign In</p>
        </button>
      </div>
    </>
  );
};

export default SignIn;
