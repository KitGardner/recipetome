import { dbContext } from "../db/DbContext.js";
import { BadRequest, Unexpected, UnAuthorized } from "../utils/Errors.js";

class FavoritesService {
  async getUserFavorites(user) {
    let favorites = await dbContext.Favorite.find({ User: user });
    return favorites;
  }
  async favoriteRecipe(favoritesData, user) {
    let existingRecipe = await dbContext.Recipe.findById(favoritesData.recipeId);

    if (!existingRecipe) {
      throw new BadRequest("There is no recipe with the id " + favoritesData.recipeId);
    }

    let favoritingResult = await dbContext.Favorite.create({ User: user, Recipe: favoritesData.recipeId });
    if (!favoritingResult) {
      throw new Unexpected("There was an error favoriting the recipe with id " + favoritesData.recipeId);
    }

    return favoritingResult;
  }

  async unFavoriteRecipe(recipeId, user) {
    let favoriteRecords = await dbContext.Favorite.find({ User: user, Recipe: recipeId });

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

    return "Unfavorited";
  }
}

const favoritesService = new FavoritesService();
export default favoritesService;