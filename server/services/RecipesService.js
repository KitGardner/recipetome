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

    for (const recipe of recipes) {
      recipe.favorited = await dbContext.Favorite.find({ Recipe: recipe.id }).select("User");
      recipe.likes = await dbContext.Like.find({ Recipe: recipe.id }).select("User");
    }

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

  async favoriteRecipe(recipeId, userInfo) {
    let existingRecipe = await dbContext.Recipe.findById(recipeId);

    if (!existingRecipe) {
      throw new BadRequest("There is no recipe with the id " + recipeId);
    }

    let favoritingResult = await dbContext.Favorite.create({ User: userInfo.email, Recipe: recipeId });
    if (!favoritingResult) {
      throw new Unexpected("There was an error favoriting the recipe with id " + recipeId);
    }

    return favoritingResult;
  }

  async unFavoriteRecipe(recipeId, userInfo) {
    let favoriteRecords = await dbContext.Favorite.find({ User: userInfo.email, Recipe: recipeId });

    if (favoriteRecords.length == 0) {
      throw new Unexpected("No favorite record were found to unfavorite")
    };

    if (favoriteRecords.length > 1) {
      throw new Unexpected("Mulitple favoriting records were found for this recipe and user");
    }

    let unFavoriteResult = await dbContext.Favorite.findByIdAndRemove(favoriteRecords[0]._id);
    if (!unFavoriteResult) {
      throw new Unexpected("There was an error unfavoriting this recipe for user " + userInfo.email);
    }

    return "Unfavorited";
  }

  async LikeRecipe(recipeId, userInfo) {
    let existingRecipe = await dbContext.Recipe.findById(recipeId);

    if (!existingRecipe) {
      throw new BadRequest("There is no recipe with the id " + recipeId);
    }

    let likingResult = await dbContext.Like.create({ User: userInfo.email, Recipe: recipeId });
    if (!likingResult) {
      throw new Unexpected("There was an error liking the recipe with id " + recipeId);
    }

    return likingResult;
  }


  async unLikeRecipe(recipeId, userInfo) {
    let likedRecords = await dbContext.Like.find({ User: userInfo.email, Recipe: recipeId });

    if (likedRecords.length == 0) {
      throw new Unexpected("No liking records were found for recipe with id " + recipeId);
    };

    if (likedRecords.length > 1) {
      throw new Unexpected("Mulitple liking records were found for this recipe and user");
    }

    let unlikeResult = await dbContext.Like.findByIdAndRemove(likedRecords[0]._id);
    if (!unlikeResult) {
      throw new Unexpected("There was an error unliking this recipe for user " + userInfo.email);
    }

    return "Like removed";
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