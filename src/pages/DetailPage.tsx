import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Recipe from "../components/Recipe";
import RecipeForm from "../components/RecipeForm";
import { RecipeService } from "../services/RecipeService";
import { ButtonField } from "../styles/AddRecipe";
import { Button, DetailsContainer, Status } from "../styles/Recipe";
import { IRecipe } from "../types/types";

function DetailsPage(props: any) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [recipe, setRecipe] = useState<IRecipe>({} as IRecipe);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean | undefined>();
  const [successElement, setSuccessElement] =
    useState<React.ReactElement<any>>();

  useEffect(() => {
    if (id) handleRecipeApi(id);
  }, []);

  useEffect(() => {
    handleSuccess();
  }, [success]);

  const handleRecipeApi = async (id: string) => {
    const recipeData = await RecipeService.getOne(id);
    setRecipe(recipeData.data);
  };

  const handleDelete = async () => {
    const response = await RecipeService.delete(recipe.id);
    const statusSuccess = response.status === 204;
    setSuccess(statusSuccess);
    if (statusSuccess)
      setTimeout(() => {
        navigate("/");
      }, 1500);
  };

  const handleFormUpdate = (recipe: IRecipe) => {
    setRecipe(recipe);
    setIsEdit(false);
    setSuccess(true);
  };
  const handleSuccess = () => {
    if (success !== undefined) {
      if (success)
        setSuccessElement(<Status status="success">Successful</Status>);
      else setSuccessElement(<Status status="failure">Failure</Status>);
    }
  };

  const handleEdit = () => {
    setIsEdit((isEdit) => !isEdit);
    setSuccess(undefined);
  };

  return (
    <div className="App">
      <ButtonField>
        <Button onClick={() => navigate(-1)} color="primary">
          Go Back
        </Button>
      </ButtonField>
      <ButtonField>
        <Button color="primary" onClick={handleEdit}>
          Update
        </Button>
        <Button color="danger" onClick={handleDelete}>
          Delete
        </Button>
      </ButtonField>

      <DetailsContainer>
        {isEdit ? (
          <RecipeForm
            handleFormUpdate={handleFormUpdate}
            isEdit={true}
            formerRecipe={recipe}
          />
        ) : (
          <Recipe size={"large"} recipe={recipe} />
        )}
        {successElement}
      </DetailsContainer>
    </div>
  );
}

export default DetailsPage;
