import { dbContext } from "../db/DbContext.js";
import { BadRequest, Unexpected, UnAuthorized } from "../utils/Errors.js";
import { profilesService } from "./ProfilesService.js";

class FavoritesService {
  async getUserFavorites(userInfo) {
    let user = await profilesService.getProfile(userInfo)
    let favoritesFound = await dbContext.Favorite.find({ User: user.id });
    let favorites = favoritesFound.map(f => f.Recipe);
    return {
      recipeIds: favorites
    };
  }
  async favoriteRecipe(favoritesData, userInfo) {
    let existingRecipe = await dbContext.Recipe.findById(favoritesData.recipeId);

    if (!existingRecipe) {
      throw new BadRequest("There is no recipe with the id " + favoritesData.recipeId);
    }

    let user = await profilesService.getProfile(userInfo);

    let favoritingResult = await dbContext.Favorite.create({ User: user.id, Recipe: favoritesData.recipeId });
    if (!favoritingResult) {
      throw new Unexpected("There was an error favoriting the recipe with id " + favoritesData.recipeId);
    }

    let newFavorite = await dbContext.Favorite.findById(favoritingResult.id).populate("User", ["name"])

    return {
      recipeId: newFavorite.Recipe,
      email: newFavorite.User.name
    };
  }

  async unFavoriteRecipe(recipeId, userInfo) {
    let user = await profilesService.getProfile(userInfo)
    let favoriteRecords = await dbContext.Favorite.find({ User: user.id, Recipe: recipeId });

    if (favoriteRecords.length == 0) {
      throw new Unexpected("No favorite record were found to unfavorite")
    };

    if (favoriteRecords.length > 1) {
      throw new Unexpected("Mulitple favoriting records were found for this recipe and user");
    }

    let unFavoriteResult = await dbContext.Favorite.findByIdAndRemove(favoriteRecords[0]._id);
    if (!unFavoriteResult) {
      throw new Unexpected("There was an error unfavoriting this recipe for the user");
    }

    return {
      email: user.name
    };
  }
}

const favoritesService = new FavoritesService();
export default favoritesService;