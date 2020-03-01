import { dbContext } from "../db/DbContext.js";
import { BadRequest, Unexpected, UnAuthorized } from "../utils/Errors.js";

class RecipesService {
  async getRecipeById(recipeId) {
    if (!recipeId) {
      throw new BadRequest("Please provide a recipe Id");
    }

    let recipe = await dbContext.Recipe.findById(recipeId);

    return recipe;
  }
  async getAllRecipes(query = {}) {
    let recipes = await dbContext.Recipe.find({ ...query, deleted: false });
    return recipes;
  }

  async createRecipe(recipeData, userInfo) {
    let createdRecipe = await dbContext.Recipe.create({
      ...recipeData,
      createdBy: userInfo.email
    });

    return {
      name: createdRecipe.name,
      description: createdRecipe.description,
      ingredients: createdRecipe.ingredients,
      directions: createdRecipe.directions,
      createdBy: createdRecipe.email,
      comments: [],
      likes: []
    };
  }
  async updateRecipe(recipeId, recipeData, userInfo) {
    let existingRecipe = await dbContext.Recipe.findById(recipeId);

    if (!existingRecipe) {
      throw new BadRequest("Did not find a recipe with the id " + recipeId);
    }

    if (existingRecipe.createdBy != userInfo.email) {
      throw new UnAuthorized("You are not the creator of this recipe and are unable to make changes to it.")
    }

    let updatedRecipe = await dbContext.Recipe.findByIdAndUpdate(recipeId, { ...recipeData, createdBy: userInfo.email }, { new: true });
    return {
      name: updatedRecipe.name,
      description: updatedRecipe.description,
      ingredients: updatedRecipe.ingredients,
      directions: updatedRecipe.directions,
      createdBy: updatedRecipe.email,
      comments: [],
      likes: []
    };
  }

  async deleteRecipe(recipeId, userInfo) {
    let existingRecipe = await dbContext.Recipe.findById(recipeId);

    if (!existingRecipe) {
      throw new BadRequest("Did not find a recipe with the Id " + recipeId)
    }

    if (existingRecipe.createdBy != userInfo.email) {
      throw new UnAuthorized("You are not the creator of this recipe and are unable to delete it");
    }

    let updatedRecipe = await dbContext.Recipe.findByIdAndUpdate(recipeId, { deleted: true }, { new: true });

    if (!updatedRecipe) {
      throw new Unexpected("An unexpected error occurred in the server");
    }

    return "Recipe deleted successfully";
  }

}

const recipesService = new RecipesService();
export default recipesService;