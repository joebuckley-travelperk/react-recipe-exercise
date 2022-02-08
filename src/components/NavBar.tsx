import React from 'react';
import { NavLink } from "react-router-dom";

import { ContainerNavBar, LinkContainer } from './../styles/NavBar'


const linkStyle = {
    margin: "0.5rem",
    textDecoration: "none",
    color: '#333',
    fontSize: '1.4rem'
  };
  

function Navbar() {
  return (
    <ContainerNavBar>
        <h1>Recipe App</h1>
        <LinkContainer>
            <NavLink style={linkStyle} to="/">View</NavLink>
            <NavLink style={linkStyle} to="/add">Add</NavLink>
        </LinkContainer>    
     </ContainerNavBar>
  );
}

export default Navbar;
