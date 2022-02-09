import React, { useState, useEffect } from "react";

import Recipe from "./../components/Recipe";
import { IRecipe } from "./../types/types";
import { RecipeService } from "../services/RecipeService";
import { Button, ListContainer } from "../styles/Recipe";
import { Input, LinkCard } from "../styles/AddRecipe";

function ViewRecipe() {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    handleRecipes();
  }, []);

  const handleRecipes = async () => {
    const response = await RecipeService.getList();
    setRecipes(response.data);
  };
  const handleSearch = async () => {
    const response = await RecipeService.search(search);
    setRecipes(response.data);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <div className="App">
      <h1>View Recipes</h1>
      <LinkCard to="/add">
        {" "}
        <Button color="primary"> Add Recipe </Button>
      </LinkCard>
      <Input
        aria-label="search-input"
        value={search}
        width={50}
        name="search"
        onChange={handleInput}
      />
      <Button onClick={handleSearch} color="primary">
        {" "}
        Search{" "}
      </Button>
      <ListContainer>
        {recipes.map((recipe: IRecipe) => {
          return (
            <LinkCard
              key={recipe.id}
              to={`/details/${recipe.id}`}
            >
              <Recipe size={"small"} recipe={recipe} />
            </LinkCard>
          );
        })}
      </ListContainer>
    </div>
  );
}

export default ViewRecipe;
