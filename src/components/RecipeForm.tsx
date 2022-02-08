import React, {useEffect, useState} from 'react';

import { useNavigate } from 'react-router-dom'

import { RecipeService } from '../services/RecipeService';
import { ButtonField, Form, Input, InputField, TextArea } from '../styles/AddRecipe';
import { Button, Status } from '../styles/Recipe';
import { IIngredient, IRecipe } from '../types/types';

type IHandleFormUpdate = (recipe:IRecipe) => void

type RecipFormProps = {
    isEdit: boolean,
    formerRecipe?: IRecipe,
    handleFormUpdate?: IHandleFormUpdate
}

enum InputName {
    Name = "Name",
    Description = "Description",
    Ingredients = "Ingredients",
    Empty = ""
  }

function RecipeForm({isEdit, formerRecipe={} as IRecipe, handleFormUpdate}: RecipFormProps) {

    const navigate = useNavigate()

    const [isError, setisError] = useState<InputName>(InputName.Empty)
    const [success, setSuccess] = useState<boolean | undefined>()
    const [recipe, setRecipe] = useState<IRecipe>({name:'', description: '', ingredients:[{name: ''}]} as IRecipe)
    const [ingredientInputs, setIngredientInputs] = useState<Array<IIngredient>>([])
    const [successElement, setSuccessElement] = useState<React.ReactElement<any>>()

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> ) =>{
        const {name, value} = e.target;
        setRecipe(recipe => ({...recipe, [name]: value}))
    }

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const invalidInputs = checkInvaildInputs();
        setisError(invalidInputs)
        if(invalidInputs) return 

        if(isEdit){
            const response = await RecipeService.update(recipe)
            setSuccess(response.status === 200)
        }else {
            const response = await RecipeService.create(recipe)
            setSuccess(response.status === 201)
        }
    }

    const checkInvaildInputs = () => {
        if(!recipe.name) return InputName.Name;
        if(!recipe.description) return InputName.Description;
        if(recipe.ingredients.length === 0) return InputName.Empty;
        return recipe.ingredients.reduce((isEmpty: InputName, ingredient: IIngredient) => {
            if(!ingredient.name) return InputName.Ingredients;
            return isEmpty
        }, InputName.Empty)
    }

    useEffect(()=>{
        handleSuccess();
        if(success && !isEdit) handleRedirect('/')
        else if(success !== undefined && handleFormUpdate) handleFormUpdate(recipe)
    }, [success])

    const handleRedirect = (url: string) =>{
        setTimeout(()=> navigate(url), 1500)
    }
    
    const handleIngredientChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const ingredients = ingredientInputs.map((ingredient) => {
            if(e.target.name === ingredient.index){
                return {name: e.target.value, index: ingredient.index}
            }
            return ingredient
        })
        setIngredientInputs(ingredients);
    }

    useEffect(()=>{
        if(isEdit && formerRecipe.name){
            setRecipe(formerRecipe)
            const ingredients = formerRecipe.ingredients.map((recipe, index) => ({name: recipe.name, index: String(index)}))
            setIngredientInputs(ingredients)
        }
    }, [])

    useEffect(()=>{
        setRecipe(recipe => ({...recipe, ingredients: ingredientInputs}));
    }, [ingredientInputs])

    const handleAddIngredientInput = () => {
        setIngredientInputs(ingredient => [...ingredient, {name: "", index: String(ingredient.length + 1)}])
    }

    const handleDeleteIngredient = (index: string) => {
        const ingredients = ingredientInputs.filter((ingredient) => ingredient.index !==index)
        setIngredientInputs(ingredients);
    }
    const handleSuccess = () =>{
        if(success !== undefined){
            if(success) setSuccessElement(<Status status="success">Success</Status>)
            else setSuccessElement(<Status status="failure">Failure</Status>)
        }
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <InputField> 
                    <div>Name</div>
                    <Input aria-label="name-input" name="name" maxLength={255} placeholder='Name' value={recipe.name} onChange={handleOnChange}/>
                </InputField>
                <InputField>
                    <div>Description</div>
                    <TextArea aria-label="description-input" maxLength={255} name="description" placeholder='description' value={recipe.description} onChange={handleOnChange} />
                </InputField>
                <InputField>
                    <div>Ingredients</div>
                </InputField>
            
                {ingredientInputs.map((ingredient: IIngredient, index:number) => {
                    return <div key={index}>
                            <Input aria-label="ingredient-input" maxLength={255} name={ingredient.index} value={ingredient.name} onChange={handleIngredientChange}/>
                            <Button type="button" onClick={() => handleDeleteIngredient(ingredient.index as string)} color="danger">Delete Ingredient</Button>
                            </div>

                })}

                <Button type="submit" color="primary">Submit</Button>
            </Form>
            
            <ButtonField>
                <Button color="primary" onClick={handleAddIngredientInput}>Add Ingredient</Button>
            </ButtonField>
                
            {successElement}
            {isError && <Status status="warning">{isError} must be filled</Status>}
        </div>

  );
}

export default RecipeForm;
