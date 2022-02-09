import React from "react";
import { NavBarLink } from "../styles/AddRecipe";

import { ContainerNavBar, LinkContainer } from "./../styles/NavBar";

function Navbar() {
  return (
    <ContainerNavBar>
      <h1>Recipe App</h1>
      <LinkContainer>
        <NavBarLink to="/">
          View
        </NavBarLink>
        <NavBarLink to="/add">
          Add
        </NavBarLink>
      </LinkContainer>
    </ContainerNavBar>
  );
}

export default Navbar;
