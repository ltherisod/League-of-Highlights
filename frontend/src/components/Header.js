import "./Header.css"
import { Link } from "react-router-dom"
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"
import { useState, useRef } from "react"
import { connect } from "react-redux"
import userActions from "../redux/actions/userActions"

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)

  const inputHandler = useRef()
  const createHandler = async () => {
    // if (inputHandler.current.value === "" && !props.userStatus){
    //   return alert("empty field")
    // }
    if (!props.userStatus) {
      alert("create an account to do it")
    } else {
      if (inputHandler.current.value === "") {
        return alert("empty field")
      }
      try {
        const res = await props.getProfileByName(inputHandler.current.value)
        console.log(res)
        if (!res.success) return alert("champion not found, try another")
        if (res.response.length === 0)
          return alert(
            "todo salio bien pero el usuario no existe amigo, o no esta en riot"
          )
        if (res.success) {
          props.history.push(`/profile/${res.response.username}`)
        } else {
          console.log("cai en else y me voy a home ")
          props.history.push(`/`)
        }
      } catch (e) {
        console.log("cae en el catch")
        alert(e.message)
      }
    }
  }

  const sesionOut = () => {
    alert("see you soon!")
    props.logOut()
  }

  return (
    <header className="sticky-top d-flex justify-content-around ">
      <Navbar
        className="navBar text-center d-flex justify-content-center align-items-center w-100"
        light
        expand="md"
      >
        <NavbarBrand
          to="/"
          className="logoNavBox text-light d-none d-md-block ms-2 "
        >
          <img className="logoNav" alt="nav logo" src="/assets/LOH_H2.png" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} className="bg-light  text-dark mx-2 changeButton " />
        <UncontrolledDropdown
          nav
          inNavbar
          className="position-absolute top-0 end-0 mb-5"
        >
          <div className="iconPosition">
            <DropdownToggle nav caret className="text-white  ">
              {props.userStatus ? (
                <img
                  className="iconNav"
                  alt="nav icon"
                  src={props.userStatus.icon}
                ></img>
              ) : (
                <i className="fas fa-user-alt text-white fs-2"></i>
              )}
            </DropdownToggle>
            <DropdownMenu className="position-absolute top-0 end-0 mt-5 text-decoration-none">
              {props.userStatus ? (
                <>
                  {props.userStatus && !props.userStatus.guest ? (
                    <Link
                      to={`/profile/${
                        props.userStatus.username || props.userStatus.user
                      }`}
                    >
                      <DropdownItem className="accountBox text-white">Profile</DropdownItem>
                    </Link>
                  ) : null}
                  <Link to="/">
                    <DropdownItem className="accountBox text-white" to="/" onClick={sesionOut}>
                      Log out
                    </DropdownItem>
                  </Link>
                </>
              ) : (
                <div>
                  {!props.userStatus && (
                    <Link className="accountLink " to="/signup">
                      {" "}
                      <DropdownItem className="accountBox text-white">
                        Sign up
                      </DropdownItem>
                    </Link>
                  )}
                  {!props.userStatus && (
                    <Link className="accountLink " to="/signin">
                      <DropdownItem className="accountBox text-white">
                        Sign in
                      </DropdownItem>
                    </Link>
                  )}
                </div>
              )}
            </DropdownMenu>
          </div>
        </UncontrolledDropdown>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="navBox mr-auto mx-4 d-flex align-items-center" navbar>
            <NavItem>
              <Link to="/" className="text-white fw-bold mx-1">
                Home{" "}
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/community" className="text-white fw-bold mx-1">
                Community
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/esports" className="text-white fw-bold mx-1">
                Esports
              </Link>
            </NavItem>
            {/* <input placeholder='Search' type='text' className=' px-2 rounded-pil'/> */}
            {/* <Input placeholder="Search" bsSize="sm" className="mx-1 rounded-pill inputSize px-5" /> */}
          </Nav>
        </Collapse>
        <div className="divSearch ">
          <input
            className="linkbox"
             disabled={!props.userStatus}         
            type="text"
            placeholder="Search your favourite player..."
            ref={inputHandler}
          />
          <img
            onClick={createHandler}
            alt="search icon"
            src="/assets/search.png"
          />
        </div>
      </Navbar>
    </header>
  )
}

const mapStateToProps = (state) => {
  return {
    userStatus: state.user.user,
  }
}

const mapDispatchToProps = {
  getProfileByName: userActions.getProfileByName,
  logOut: userActions.logOut,
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
