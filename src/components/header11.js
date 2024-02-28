import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../components/header.css"
const Header11=()=>{

    const navigate= useNavigate();
    
function Logout(){
    try{
        const auth = getAuth();
        signOut(auth).then(() => {
          // Sign-out successful.
          toast.success("Logout successfully");
          navigate("/");
        }).catch((error) => {
          // An error happened.
        });
        
    }catch(e){
        toast.error(e.message)
    }
   
}

    return(
        <div>
         <Navbar className="bg-body-tertiary">
        <Container className="hello">
          <Navbar.Brand href="#home" id="name">Financly.</Navbar.Brand>
          <Navbar.Brand  id="name" onClick={Logout} style={{cursor:"pointer"}}>Logout</Navbar.Brand>
        </Container>
      </Navbar>
        </div>
    )
}

export default Header11;