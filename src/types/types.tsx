export interface IRecipe {
    id: number
    name: string
    description: string
    ingredients: IIngredient[]
}
export type IIngredient = {
    index?: string
    name: string
}