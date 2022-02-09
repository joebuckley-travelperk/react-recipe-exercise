import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  cleanup,
  act,
} from "@testing-library/react";

import { RecipeService } from "../services/RecipeService";
import renderer from "react-test-renderer";

import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

import ViewRecipe from "../pages/ViewRecipe";

jest.mock("../services/RecipeService");

const mockData = {
  data: [
    {
      id: 1,
      name: "Bread",
      description: "This is good",
      ingredients: [{ name: "dough" }],
    },
    {
      id: 2,
      name: "Pizza",
      description: "Would recommend",
      ingredients: [{ name: "dough" }, { name: "tomato" }],
    },
  ],
  status: 200,
};

const searchMockData = {
  data: [
    {
      id: 2,
      name: "Pizza",
      description: "Would recommend",
      ingredients: [{ name: "dough" }, { name: "tomato" }],
    },
  ],
  status: 200,
};

afterEach(() => cleanup);

const setup = () => {
  const utils = render(
    <MemoryRouter>
      <ViewRecipe />
    </MemoryRouter>
  );
  const input = utils.getByLabelText("search-input");
  return {
    input,
    ...utils,
  };
};

it("renders correctly", async () => {
  RecipeService.getList = jest.fn(() => Promise.resolve(mockData));
  let tree: any;
  const { act } = renderer;
  await act(async () => {
    tree = renderer
      .create(
        <MemoryRouter>
          <ViewRecipe />
        </MemoryRouter>
      )
      .toJSON();
    //await waitFor(() => expect(RecipeService.getList).toHaveBeenCalledTimes(1));
  });

  expect(tree).toMatchSnapshot();
});

test("render mock data", async () => {
  RecipeService.getList = jest.fn(() => Promise.resolve(mockData));
  await act(async () => {
    setup();
  });
  const recipeElement = await waitFor(() =>
    screen.getByText(mockData.data[0].name)
  );
  expect(recipeElement).toBeInTheDocument();
});

test("search", async () => {
  RecipeService.getList = jest.fn(() => Promise.resolve(mockData));
  RecipeService.search = jest.fn(() => Promise.resolve(searchMockData));
  await act(async () => {
    const { input } = setup();
    await waitFor(() => screen.findByText(/Bread/i));

    fireEvent.change(input, { target: { value: "Pizz" } });
    await fireEvent.click(screen.getByText(/Search/i));
    await waitFor(() => expect(RecipeService.search).toHaveBeenCalledTimes(1));
  });
  const breadElement = screen.queryByText(mockData.data[0].name);
  const pizzaElement = screen.queryByText(mockData.data[1].name);

  expect(breadElement).toBeNull();
  expect(pizzaElement).toBeInTheDocument();
});
