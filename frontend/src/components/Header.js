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
} from "reactstrap";
import { useState,useRef } from "react"
import {connect} from 'react-redux'
import userActions from "../redux/actions/userActions";

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const inputHandler = useRef()

  const createHandler = async () => {
   console.log(inputHandler.current.value)
   if(inputHandler.current.value === "") return alert("completa los campos hijo de puta")
    
    try{
      const res = await props.getProfileByName(inputHandler)
      if(!res.success)  return alert("todo salio muy como el orto")
      if(res.response.length === 0) return alert("todo salio bien pero el usuario no existe amigo, o no esta en riot")
      console.log(res)
    }catch(e){
      alert("todo salio muyx2 como el orto ")
    }
  }



  return (
    <header className='sticky-top d-flex justify-content-around '>
      <Navbar
        className="bg-dark text-center d-flex justify-content-center align-items-center py-3 w-100"
        light
        expand="md"
      >
        <NavbarBrand to="/" className="logoNavBox text-light d-none d-md-block ms-2 ">
          <img className="logoNav" src="./assets/LOH_H.png"/>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} className="bg-light  text-dark mx-2 " />
        <UncontrolledDropdown
          nav
          inNavbar
          className="position-absolute top-0 end-0 mb-5"
        >
          <div className="iconPosition">
            <DropdownToggle nav caret className="text-white  ">
              <i className="fas fa-user-alt text-white fs-2"></i>
            </DropdownToggle>
            <DropdownMenu className="position-absolute top-0 end-0 mt-5">
              <Link to='/signup'><DropdownItem>Sign up</DropdownItem></Link> 
              <Link to="/signin"> <DropdownItem>Sign in</DropdownItem> </Link>
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
              <Link to='/community' className="text-white fw-bold mx-1">Community</Link>
            </NavItem>
            <NavItem>
              <Link to='/news' className="text-white fw-bold mx-1">Esports</Link>
            </NavItem>
            {/* <input placeholder='Search' type='text' className=' px-2 rounded-pil'/> */}
            {/* <Input placeholder="Search" bsSize="sm" className="mx-1 rounded-pill inputSize px-5" /> */}
          </Nav>
        </Collapse>
        <div className="divSearch">
            <input className="textbox" type="text" placeholder="Search your favourite player..." ref={inputHandler}/>
            <img onClick={createHandler} src="./assets/search.png"/>
        </div> 
      </Navbar>
    </header>
  );
};


const mapDispatchToprops= {
  getProfileByName: userActions.getProfileByName
}


export default connect(null, mapDispatchToprops)(Header)