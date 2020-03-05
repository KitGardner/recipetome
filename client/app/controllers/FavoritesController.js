import { Auth0Provider } from "../auth/Auth0Provider.js"
import store from "../store.js";
import favoritesService from "../Services/FavoritesService.js";


export default class FavoritesController {

  async favoriteRecipe(recipeId) {
    try {
      await favoritesService.favoriteRecipe(recipeId);
    } catch (error) {
      console.log(error);
    }
  }

  async unFavoriteRecipe(recipeId) {
    try {
      await favoritesService.unFavoriteRecipe(recipeId);
    } catch (error) {
      console.log(error);

    }
  }

}