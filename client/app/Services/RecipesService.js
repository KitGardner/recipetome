import { resource } from "../resource.js";
import Recipe from "../Models/Recipe.js";
import store from "../store.js";

class RecipesService {
  async getRecipes() {
    let data = await resource.get("api/recipes");

    console.log(data);
    let recipes = data.map(d => new Recipe(d))
    store.commit("recipes", recipes);
  }

}

let recipesService = new RecipesService();
export default recipesService;