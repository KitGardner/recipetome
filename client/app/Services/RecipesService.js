import { resource } from "../resource.js";
import Recipe from "../Models/Recipe.js";
import store from "../store.js";
import favoritesService from "./FavoritesService.js";
import likesService from "./LikesService.js";

class RecipesService {

  initializeNewRecipe() {
    let newRecipe = new Recipe();
    store.commit("activeRecipe", newRecipe);
  }
  async createRecipe(recipeData) {
    let createdRecipe = await resource.post("api/recipes", recipeData);

    let newRecipe = new Recipe(createdRecipe);
    newRecipe.setCanDelete(createdRecipe.createdBy.name);
    store.State.recipes.push(newRecipe);
    store.commit("recipes", store.State.recipes);
  }
  async getRecipes() {
    let data = await resource.get("api/recipes");

    console.log(data);
    let recipes = data.map(d => new Recipe(d))
    store.commit("recipes", recipes);
  }

  async deleteRecipe(id) {
    let result = await resource.delete("api/recipes/" + id);

    if (result.id) {
      let recipeIndex = store.State.recipes.findIndex(r => r.Id == result.id);

      if (recipeIndex == -1) {
        throw new Error("Could not remove the recipe because it was not found in the store");
      }
      store.State.recipes.splice(recipeIndex, 1);
      store.commit("recipes", store.State.recipes);
    }
  }

  async setUserData(userInfo) {
    let visibleRecipes = store.State.recipes;

    let favorites = await favoritesService.getUserFavorites();
    await likesService.getAllLikes();
    let likes = store.State.likes;
    if (favorites.recipeIds && favorites.recipeIds.length > 0) {
      let favoritedRecipes = visibleRecipes.filter(r => favorites.recipeIds.includes(r.Id));

      if (favoritedRecipes.length == 0) {
        throw new Error("Could not find any of the favorited recipes");
      }

      favoritedRecipes.forEach(recipe => {
        recipe.favorited.push(userInfo.email);
        recipe.setIsFavorited(userInfo.email);
      })
    }

    visibleRecipes.forEach(recipe => {
      recipe.setCanDelete(userInfo.email);
    })

    if (likes) {
      let recipeIds = likes.map(l => l.Recipe);
      recipeIds.forEach(id => {
        let likedUsers = likes.filter(l => l.Recipe == id).map(l => l.User.name);
        let recipeIndex = visibleRecipes.findIndex(r => r.Id == id);
        visibleRecipes[recipeIndex].likes = visibleRecipes[recipeIndex].likes.concat(likedUsers);
        visibleRecipes[recipeIndex].setUserLiked(userInfo.email);
      })
    }

    store.commit("recipes", visibleRecipes);
  }

}

let recipesService = new RecipesService();
export default recipesService;