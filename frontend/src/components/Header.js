import "./Header.css"
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
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
    <header className='sticky-top d-flex justify-content-center '>
      <Navbar
        className="bg-dark text-center d-flex justify-content-center align-items-center py-3 w-100"
        light
        expand="md"
      >
        <NavbarBrand to="/" className="text-light d-none d-md-block ms-2 ">
          LOGO
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
              <Link to="/signin"> <DropdownItem>Sign in</DropdownItem> </Link>
              <DropdownItem>Sign up</DropdownItem>
            </DropdownMenu>
          </div>
        </UncontrolledDropdown>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto mx-4 d-flex align-items-center" navbar>
            <NavItem>
              <NavLink to="/" className="text-white fw-bold mx-1">
                Home{" "}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="text-white fw-bold mx-1">Community</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="text-white fw-bold mx-1">News</NavLink>
            </NavItem>
            {/* <input placeholder='Search' type='text' className=' px-2 rounded-pil'/> */}
            {/* <Input placeholder="Search" bsSize="sm" className="mx-1 rounded-pill inputSize px-5" /> */}
            <input className="textbox" type="text"/>
          </Nav>
        </Collapse>
      </Navbar>
    </header>
  );
};
export default Header;
