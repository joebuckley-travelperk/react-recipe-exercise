import React from "react";

import RecipeForm from "../components/RecipeForm";
import { ButtonField, LinkCard } from "../styles/AddRecipe";
import { Button } from "../styles/Recipe";


function AddRecipe() {
  return (
    <div>
      <ButtonField>
        <LinkCard to="/">
          <Button color="primary">Go To View</Button>
        </LinkCard>
        <h1>Add Recipe</h1>
      </ButtonField>
      <RecipeForm isEdit={false} />
    </div>
  );
}

export default AddRecipe;
