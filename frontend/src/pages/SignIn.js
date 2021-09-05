import "./SignIn.css"
import Header from "../components/Header"

const SignIn = () => {
  return (
    <>
      <Header />
      <div className="userForm">
        <h3 className="my-3">Sign in</h3>
        <form className=" my-2">
          <div className="my-1">
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
          <div className="my-1">
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
        <button className="my-2 py-1 px-3  mb-4">
          <p className="fs-4 ">Sign In</p>
        </button>
      </div>
    </>
  );
};

export default SignIn;
