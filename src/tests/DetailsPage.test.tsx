import React from 'react';
import {render, fireEvent, waitFor, screen, cleanup} from '@testing-library/react'

import renderer from 'react-test-renderer';

import { act } from 'react-dom/test-utils';

import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom'

import { RecipeService } from '../services/RecipeService';
import DetailsPage from '../pages/DetailPage';
import { IRecipe } from '../types/types';


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

const mockDataUpdate = {
  data:{
    id: 1, 
    name: "Pizza", 
    description: "This is bad", 
    ingredients:[{name: "tomato"}]
  },
  status: 201
}
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        id: '1'
    }),
    useNavigate:()=> mockNavigate
}))



afterEach(() => {
    cleanup()
})


const getInputs = (utils: any) =>{
  const nameInput = utils.getByLabelText('name-input')
  const descriptionInput = utils.getByLabelText('description-input')
  return {
    nameInput,
    descriptionInput
  }
}


it('renders correctly', async () => {
  RecipeService.getOne = jest.fn(()=> Promise.resolve(mockData))
  let tree: any
  const {act} = renderer;
  await act( async  () => {
    tree = renderer
    .create(<MemoryRouter><DetailsPage/></MemoryRouter>)
    .toJSON();
    await waitFor(() => expect(RecipeService.getOne).toHaveBeenCalledTimes(1));
  })
    
  expect(tree).toMatchSnapshot();
});

test('retieve one element', async () => {
    RecipeService.getOne = jest.fn(()=> Promise.resolve(mockData))

    await act(async() => {
        render(<MemoryRouter><DetailsPage/></MemoryRouter>)
    })
    const successElement =  await waitFor(() => screen.getByText(new RegExp(mockData.data.name, 'i')))
      
    expect(successElement).toBeInTheDocument();
});



test('show update field', async () => {
  RecipeService.getOne = jest.fn(()=> Promise.resolve(mockData))
  let utils
  await act(async() => {
      utils = render(<MemoryRouter><DetailsPage/></MemoryRouter>)

      await fireEvent.click(screen.getByText(/Update/i));
  })
  const { nameInput, descriptionInput } = getInputs(utils);

  expect(nameInput).toBeInTheDocument();
  expect(descriptionInput).toBeInTheDocument();
});

test('submit update field', async () => {
  RecipeService.getOne = jest.fn(()=> Promise.resolve(mockData))
  RecipeService.update = jest.fn(()=> Promise.resolve(mockDataUpdate))

  await act(async() => {
    const utils = render(<MemoryRouter><DetailsPage/></MemoryRouter>)
    await waitFor(() => expect(RecipeService.getOne).toHaveBeenCalledTimes(1))

    await fireEvent.click(screen.getByText(/Update/i))
    await fireEvent.click(screen.getByText(/Add Ingredient/i))

    await fireEvent.click(screen.getByText(/Delete Ingredient/i))
    await fireEvent.click(screen.getByText(/Add Ingredient/i))
    
    const ingredientInput = utils.getByLabelText('ingredient-input')
    fireEvent.change(ingredientInput, {target: {value: mockDataUpdate.data.ingredients[0].name}})

    const { nameInput, descriptionInput } = getInputs(utils);
    fireEvent.change(nameInput, {target: {value: mockDataUpdate.data.name}})
    fireEvent.change(descriptionInput, {target: {value: mockDataUpdate.data.description}})

    await fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() => expect(RecipeService.update).toHaveBeenCalledTimes(1));

  });
  const successElement =  await waitFor(() => screen.getByText(/Success/i));
  const oldIngredient = await screen.queryByText(new RegExp(mockData.data.ingredients[0].name, 'i'));
  const newIngredient =  await screen.getByText(new RegExp(mockDataUpdate.data.ingredients[0].name, 'i'));
  const newName = await screen.queryByText(new RegExp(mockDataUpdate.data.ingredients[0].name, 'i'));
  const newDescription = await screen.queryByText(new RegExp(mockDataUpdate.data.ingredients[0].name, 'i'));

  expect(oldIngredient).toBeNull();
  expect(newDescription).toBeInTheDocument();
  expect(newIngredient).toBeInTheDocument();
  expect(successElement).toBeInTheDocument();
  expect(newName).toBeInTheDocument();
});

test('delete element successful', async () => {
  RecipeService.getOne = jest.fn(()=> Promise.resolve(mockData))
  RecipeService.delete = jest.fn(()=> Promise.resolve({data:{} as IRecipe, status: 204}))

  await act(async() => {
    render(<MemoryRouter><DetailsPage/></MemoryRouter>)

    await fireEvent.click(screen.getByText(/Delete/i))
  })
  const successElement =  await waitFor(() => screen.getByText(/Success/i));

  expect(successElement).toBeInTheDocument();
});

test('delete element failure', async () => {
  RecipeService.getOne = jest.fn(()=> Promise.resolve(mockData))
  RecipeService.delete = jest.fn(()=> Promise.resolve({data:{} as IRecipe, status: 400}))

  await act(async() => {
    render(<MemoryRouter><DetailsPage/></MemoryRouter>)

    await fireEvent.click(screen.getByText(/Delete/i));
  })
  const successElement =  await waitFor(() => screen.getByText(/Failure/i))

  expect(successElement).toBeInTheDocument();
});


test('go to home page', async () => {
  RecipeService.getOne = jest.fn(()=> Promise.resolve(mockData))

  await act(async() => {
    render(<MemoryRouter initialEntries={['/details/1']}><DetailsPage/></MemoryRouter>)
    await fireEvent.click(screen.getByText(/Go Back/i))
  })
  expect(mockNavigate).toHaveBeenCalledWith(-1);
});