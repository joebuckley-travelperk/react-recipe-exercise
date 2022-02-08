import React, {useState, useEffect} from 'react';
import axios from 'axios'

import Recipe from './../components/Recipe'
import { IRecipe } from './../types/types'
import { RecipeService } from '../services/RecipeService';
import { Link } from 'react-router-dom';
import { Button, ListContainer } from '../styles/Recipe';
import { Input } from '../styles/AddRecipe';

const linkStyle = {
  margin: "0.5rem",
  textDecoration: "none",
  color: '#333'
};

function ViewRecipe() {
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState('');
    useEffect(()=>{
        handleRecipes();
    }, [])

    const handleRecipes = async () =>{
        const response = await RecipeService.getList();
        setRecipes(response.data);
    }
    const handleSearch = async () =>{
        const response = await RecipeService.search(search);
        setRecipes(response.data);
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }
  return (
    <div className="App">
      <h1>View Recipes</h1>
      <Link style={linkStyle} to='/add'> <Button color='primary'> Add Recipe </Button></Link>
      <Input aria-label="search-input" value={search}  width={50} name="search" onChange={handleInput} />
      <Button onClick={handleSearch} color='primary'> Search </Button>
      <ListContainer>
        {recipes.map((recipe: IRecipe) => {
            return (<Link style={linkStyle} key={recipe.id} to={`/details/${recipe.id}`}><Recipe  size={'small'} recipe={recipe} /></Link>)
        })}
      </ListContainer>
    </div>
  );
}

export default ViewRecipe;
