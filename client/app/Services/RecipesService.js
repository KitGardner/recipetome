import { resource } from "../resource.js";
import Recipe from "../Models/Recipe.js";
import store from "../store.js";

class RecipesService {
  initializeNewRecipe() {
    let newRecipe = new Recipe();
    store.commit("activeRecipe", newRecipe);
  }
  async createRecipe(recipeData) {
    let createdRecipe = await resource.post("api/recipes", recipeData);

    let newRecipe = new Recipe(createdRecipe);
    store.State.recipes.push(newRecipe);
    store.commit("recipes", store.State.recipes);
  }
  async getRecipes() {
    let data = await resource.get("api/recipes");

    console.log(data);
    let recipes = data.map(d => new Recipe(d))
    store.commit("recipes", recipes);
  }

}

let recipesService = new RecipesService();
export default recipesService;