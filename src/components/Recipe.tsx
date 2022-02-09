import React from "react";
import { ContainerRecipe, Field } from "../styles/Recipe";
import { IIngredient, IRecipe } from "./../types/types";

type RecipeProps = {
  recipe: IRecipe;
  size: string;
};

function Recipe({ recipe, size }: RecipeProps) {
  return (
    <ContainerRecipe size={size}>
      <h2>{recipe.name}</h2>

      <Field>
        <h4>Description: </h4>
        <div>
          <p>{recipe.description}</p>{" "}
        </div>
      </Field>
      <Field>
        <h4>Ingredients</h4>
        <div>
          {recipe.ingredients &&
            recipe.ingredients.map((ingredient: IIngredient, index: number) => {
              return <p key={index}>- {ingredient.name}</p>;
            })}
        </div>
      </Field>
    </ContainerRecipe>
  );
}

export default Recipe;
