import { resource } from "../resource.js";
import store from "../store.js";

class FavoritesService {

  async getUserFavorites() {
    return await resource.get("api/favorites");
  }

  async favoriteRecipe(recipeId) {
    let result = await resource.post("api/favorites", { recipeId: recipeId });

    if (result.email) {
      let recipeIndex = store.State.recipes.findIndex(r => r.Id == recipeId);

      if (recipeIndex == -1) {
        throw new Error("could not find recipe in the store");
      }
      store.State.recipes[recipeIndex].favorited.push(result.email);
      store.State.recipes[recipeIndex].setIsFavorited(result.email);
      store.commit("recipes", store.State.recipes);
    }
  }

  async unFavoriteRecipe(recipeId) {
    let result = await resource.delete("api/favorites/" + recipeId);

    debugger;
    if (result.email) {
      let recipeIndex = store.State.recipes.findIndex(r => r.Id == recipeId);

      if (recipeIndex == -1) {
        throw new Error("could not find recipe in the store");
      }

      let unFavoritedRecipe = store.State.recipes[recipeIndex];

      let userEmailIndex = unFavoritedRecipe.favorited.findIndex(f => f == result.email);
      unFavoritedRecipe.favorited.splice(userEmailIndex, 1);
      unFavoritedRecipe.setIsFavorited(result.email);
      store.State.recipes.splice(recipeIndex, 1, unFavoritedRecipe);
      store.commit("recipes", store.State.recipes);
    }

  }

}

let favoritesService = new FavoritesService();
export default favoritesService;