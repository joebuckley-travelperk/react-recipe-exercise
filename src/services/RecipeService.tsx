import axios, { AxiosError, AxiosResponse } from "axios";
import { IRecipe } from "../types/types";

const BASE_URL = "http://localhost:8000";

interface ServerResponseOne {
  data: IRecipe;
  status: number;
}

interface ServerResponseArray {
  data: IRecipe[];
  status: number;
}

export const RecipeService = {
  getList: async function (): Promise<ServerResponseArray> {
    try {
      const response = await axios.get(`${BASE_URL}/api/recipe/`);
      return response;
    } catch (error: any) {
      return error;
    }
  },
  getOne: async function (id: string): Promise<ServerResponseOne> {
    try {
      const response = await axios.get(`${BASE_URL}/api/recipe/${id}/`);
      return response;
    } catch (error: any) {
      return error;
    }
  },
  delete: async function (id: number): Promise<ServerResponseOne> {
    try {
      const response = await axios.delete(`${BASE_URL}/api/recipe/${id}/`);
      return response;
    } catch (error: any) {
      return error;
    }
  },
  search: async function (name: string): Promise<ServerResponseArray> {
    try {
      const response = await axios.get(`${BASE_URL}/api/recipe/?name=${name}`);
      return response;
    } catch (error: any) {
      return error;
    }
  },
  create: async function (recipe: IRecipe): Promise<ServerResponseOne> {
    try {
      const response = await axios.post(`${BASE_URL}/api/recipe/`, recipe);
      return response;
    } catch (error: any) {
      return error.response as ServerResponseOne;
    }
  },
  update: async function (recipe: IRecipe): Promise<ServerResponseOne> {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/recipe/${recipe.id}/`,
        recipe
      );
      return response;
    } catch (error: any) {
      return error.response as ServerResponseOne;
    }
  },
};
