import React from "react";
import { Navbar , Nav , Button } from "react-bootstrap";
import { NavLink , useNavigate } from "react-router-dom";
require("../css/navBar.css");

export default function NavBar({user , setUser}) {
  const navigate = useNavigate();

  const closeSesion = () => {
    setUser('');
    navigate("/");   
  }
  return (
    <Navbar bg="primary" variant='dark' expand="lg" >
      <Navbar.Brand className='ms-3'>Control de Gastos</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav"  className="navCollapse">
        <Nav>
        {user ? <Button >{user.name + ' ' + user.lastname}</Button>  : <Nav.Link to="/" as={NavLink} >Iniciar Sesion</Nav.Link>}
        {user ? <Button onClick={() => closeSesion()} >Cerrar Sesion</Button>  : <Nav.Link to="/register" as={NavLink} >Registrarse</Nav.Link>}
        </Nav>
      </Navbar.Collapse>
  </Navbar>
  );
}
