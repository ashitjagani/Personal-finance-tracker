import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import "../components/header.css"
const Header=()=>{

    return(
        <div>
           <Navbar className="bg-body-tertiary sticky-top">
        <Container className="hello">
          <Navbar.Brand href="#home" id="name">Financly.</Navbar.Brand>
          <Navbar.Brand href="#home" id="name">Dashboard</Navbar.Brand>
        </Container>
      </Navbar>
        </div>
    )
}

export default Header