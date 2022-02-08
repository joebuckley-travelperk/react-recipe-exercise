import React from 'react';

import { Link } from 'react-router-dom'

import RecipeForm from '../components/RecipeForm';
import { ButtonField } from '../styles/AddRecipe';
import { Button } from '../styles/Recipe';

const linkStyle = {
  margin: "0.5rem",
  textDecoration: "none",
  color: '#333'
};
function AddRecipe() {

  return (
    <div>
      <ButtonField>
        <Link style={linkStyle} to='/'><Button color="primary">Go To View</Button></Link>
        <h1>Add Recipe</h1>
      </ButtonField>
      <RecipeForm isEdit={false} />
    </div>
  );
}

export default AddRecipe;
