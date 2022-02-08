import React from 'react';
import {render, fireEvent, waitFor, screen, cleanup} from '@testing-library/react'

import renderer from 'react-test-renderer';

import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom'
import { RecipeService } from '../services/RecipeService';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

import AddRecipe from '../pages/AddRecipe';


jest.mock('../services/RecipeService');
const mockData = {
  data:{
    id: 1, 
    name: "Bread", 
    description: "This is good", 
    ingredients:[{name: "dough"}]
  },
  status: 201
}

afterEach(() => {
    cleanup()
})



const setup = () => {
  const utils = render((<MemoryRouter><AddRecipe/></MemoryRouter>))
  const nameInput = utils.getByLabelText('name-input')
  const descriptionInput = utils.getByLabelText('description-input');

  return {
    nameInput,
    descriptionInput,
    ...utils,
  }
}

const fillInputs = async () =>{
    const {nameInput, descriptionInput} = setup();
    await fireEvent.change(nameInput, {target: {value: 'New Item'}})
    await fireEvent.change(descriptionInput, {target: {value: 'Test Item'}});
}

it('renders correctly', () => {
  RecipeService.create = jest.fn(()=> Promise.resolve(mockData))
  let tree
  const {act} = renderer;
    act(() => {
    tree = renderer
    .create(<MemoryRouter><AddRecipe/></MemoryRouter>)
    .toJSON();
  })
  expect(tree).toMatchSnapshot();
});

test('create recipe success', async () => {
    RecipeService.create = jest.fn(()=> Promise.resolve(mockData))

    await act(async() => {
        await fillInputs()
        await fireEvent.click(screen.getByText(/Add Ingredient/i))
       
        const ingredientInput = screen.getByLabelText('ingredient-input');
        await userEvent.type(ingredientInput, 'Test Ingredient');

        await fireEvent.click(screen.getByText(/Submit/i))
        await waitFor(() => expect(RecipeService.create).toHaveBeenCalledTimes(1));
    })
    const successElement =  await waitFor(() => screen.getByText(/Success/i))
         
    expect(successElement).toBeInTheDocument();
});


test('create recipe failure', async () => {
    RecipeService.create = jest.fn(()=> Promise.resolve({...mockData, status: 500}))
    await act( async ()=>{
        await fillInputs();
        await fireEvent.click(screen.getByText(/Submit/i));
    })
    const failureElement =  await waitFor(() => screen.getByText(/Failure/i));

    expect(failureElement).toBeInTheDocument();
});


test('cannot submit if all fields are not entered', async () => {
  RecipeService.create = jest.fn(()=> Promise.resolve({...mockData, status: 500}))
  await act( async ()=>{
    const {nameInput} = setup();
    await fireEvent.change(nameInput, {target: {value: 'New Item'}});   

    await fireEvent.click(screen.getByText(/Submit/i));
  })
  const successElement =  await waitFor(() => screen.getByText(/Description must be filled/i));
  expect(RecipeService.create).toHaveBeenCalledTimes(0);

  expect(successElement).toBeInTheDocument();
});