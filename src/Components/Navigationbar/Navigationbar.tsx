import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Logo from "../../assets/icons/main_logo_with_darktext_dphi 1.png";
const Navigationbar = () => {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="white" variant="dark">
        <Container>
          <Navbar.Brand href="#home"><img src={Logo} alt="" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className='d-flex justify-content-center '>
            <Nav className=" d-flex justify-content-center">
              <Link to="/" className='text-decoration-none text-dark'>
                Home
              </Link>
              <Link to="/createHackathon" className='text-decoration-none ps-5 text-dark'>
                Create Hackathon
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigationbar;