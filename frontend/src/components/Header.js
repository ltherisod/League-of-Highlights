import "./Header.css"
import { Link } from "react-router-dom";
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
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

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
          <Nav className="mr-auto mx-4 d-flex align-items-center" navbar>
            <NavItem>
              <Link to="/" className="text-white fw-bold mx-1">
                Home{" "}
              </Link>
            </NavItem>
            <NavItem>
              <Link to='/community' className="text-white fw-bold mx-1">Community</Link>
            </NavItem>
            <NavItem>
              <Link to='/news' className="text-white fw-bold mx-1">News</Link>
            </NavItem>
            {/* <input placeholder='Search' type='text' className=' px-2 rounded-pil'/> */}
            {/* <Input placeholder="Search" bsSize="sm" className="mx-1 rounded-pill inputSize px-5" /> */}
          </Nav>
        </Collapse>
        <div className="divSearch">
            <input className="textbox" type="text" placeholder="Search your favourite player..."/>
            <img src="./assets/search.png"/>
        </div> 
      </Navbar>
    </header>
  );
};
export default Header;
