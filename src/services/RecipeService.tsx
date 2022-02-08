import axios, { AxiosError, AxiosResponse } from 'axios'
import { IRecipe } from '../types/types';


interface ServerResponseOne {
    data: IRecipe,
    status: number
}

interface ServerResponseArray {
    data: IRecipe[],
    status: number
}

export const RecipeService = {
    getList: async function() {
        try{
            const response  = await axios.get("http://localhost:8000/api/recipe/");
            return response    
        }catch(error: any){
            return error
        }
    },
    getOne: async function(id: string): Promise<ServerResponseOne> {
        try{
            const response  = await axios.get(`http://localhost:8000/api/recipe/${id}/`);
            return response
        }catch(error:any){
            return error
        }

    },
    delete: async function(id: number): Promise<ServerResponseOne>{
        try{
            const response = await axios.delete(`http://localhost:8000/api/recipe/${id}/`);
            return response        
        }catch(error: any){
            return error
        }
    },
    search: async function(name: string){
        try{
            const response  = await axios.get(`http://localhost:8000/api/recipe/?name=${name}`);
            return response.data
        }catch(error){
            return error
        }
       
    },
    create: async function(recipe: IRecipe): Promise<ServerResponseOne>{
        try{
            const response  = await axios.post(`http://localhost:8000/api/recipe/`, recipe);
            return response
        }catch(error: any){
            return error.response as ServerResponseOne
        }
       
    },
    update: async function(recipe: IRecipe): Promise<ServerResponseOne>{
        try{
            const response  = await axios.put(`http://localhost:8000/api/recipe/${recipe.id}/`, recipe);
            return response
        }catch(error: any){
            return error.response as ServerResponseOne
        }

    }
}