import { resource } from "../resource.js";
import { Auth0Provider } from "../auth/Auth0Provider.js"
import recipesService from "../Services/RecipesService.js";
import store from "../store.js";

function drawRecipes() {
  let recipes = store.State.recipes;
  let template = "";

  recipes.forEach(recipe => {
    template += recipe.ListTemplate;
  });

  document.getElementById("pageContent").innerHTML = template;

}

export default class RecipesController {
  constructor() {
    Auth0Provider.onAuth(this.printUser);
    this.getRecipes();
    store.subscribe("recipes", drawRecipes);
  }

  async getRecipes() {
    try {
      await recipesService.getRecipes();
      //await resource.post("api/recipes", data) syntax for sending data
    } catch (error) {
      console.log(error);

    }
  }

  async printUser() {
    console.log(Auth0Provider.user);
    console.log(Auth0Provider.userInfo);
  }

  async createRecipe() {
    try {
      await resource.post("api/recipes", {
        title: "ScrambledEggs"
      });
    } catch (error) {
      console.log(error);

    }
  }
}