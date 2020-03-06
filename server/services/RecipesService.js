import { dbContext } from "../db/DbContext.js";
import { BadRequest, Unexpected, UnAuthorized } from "../utils/Errors.js";
import { profilesService } from "./ProfilesService.js";

class RecipesService {

  async getRecipeById(recipeId) {
    if (!recipeId) {
      throw new BadRequest("Please provide a recipe Id");
    }

    let recipe = await dbContext.Recipe.findById(recipeId);

    return recipe;
  }
  async getAllRecipes(query = {}) {
    let recipes = await dbContext.Recipe.find({ ...query, deleted: false }).populate("createdBy", ["name", "picture"]);
    return recipes;
  }

  async createRecipe(recipeData, userInfo) {
    let user = await profilesService.getProfile(userInfo);
    if (!user.subs.includes(userInfo.sub)) {
      throw new BadRequest("The requesting user does not match the user info provided");
    }

    let createdRecipe = await dbContext.Recipe.create({
      ...recipeData,
      createdBy: user.id,
    });

    let fullRecipe = await dbContext.Recipe.findById(createdRecipe.id).populate("createdBy", ["name", "picture"]);

    return fullRecipe;
  }
  async updateRecipe(recipeId, recipeData, userInfo) {
    let existingRecipe = await dbContext.Recipe.findById(recipeId);

    if (!existingRecipe) {
      throw new BadRequest("Did not find a recipe with the id " + recipeId);
    }

    let user = await profilesService.getProfile(userInfo);

    if (!user.subs.includes(userInfo.sub)) {
      throw new BadRequest("The requesting user does not match the user info provided");
    }

    if (existingRecipe.createdBy != user.id) {
      throw new UnAuthorized("You are not the creator of this recipe and are unable to make changes to it.")
    }

    let updatedRecipe = await dbContext.Recipe.findByIdAndUpdate(recipeId, { ...recipeData, createdBy: user.id }, { new: true });

    if (!updatedRecipe) {
      throw new Unexpected("An error occurred while updating the recipe");
    }

    return await dbContext.Recipe.findById(updatedRecipe.id).populate("createdBy", ["name", "picture"]);
  }

  async deleteRecipe(recipeId, userInfo) {
    let existingRecipe = await dbContext.Recipe.findById(recipeId);
    let user = await profilesService.getProfile(userInfo);

    if (!user.subs.includes(userInfo.sub)) {
      throw new BadRequest("The requesting user does not match the user info provided");
    }

    if (!existingRecipe) {
      throw new BadRequest("Did not find a recipe with the Id " + recipeId)
    }

    if (existingRecipe.createdBy != user.id) {
      throw new UnAuthorized("You are not the creator of this recipe and are unable to delete it");
    }

    let updatedRecipe = await dbContext.Recipe.findByIdAndUpdate(recipeId, { deleted: true }, { new: true });

    if (!updatedRecipe) {
      throw new Unexpected("An unexpected error occurred in the server");
    }

    return {
      id: updatedRecipe.id
    };
  }

}

const recipesService = new RecipesService();
export default recipesService;