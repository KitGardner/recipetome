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

function drawActiveRecipe() {
  document.getElementById("pageContent").innerHTML = store.State.activeRecipe.CreateTemplate;
}

export default class RecipesController {
  constructor() {
    Auth0Provider.onAuth(this.printUser);
    this.getRecipes();
    store.subscribe("recipes", drawRecipes);
    store.subscribe("activeRecipe", drawActiveRecipe);
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

  async createRecipe(event) {
    try {
      debugger;
      event.preventDefault();

      let form = event.target;
      let recipeData = {};
      recipeData.imgUrl = form.imgUrl.value;
      recipeData.name = form.name.value;
      recipeData.description = form.description.value;
      recipeData.ingredients = form.ingredients.value;
      recipeData.directions = form.directions.value;

      await recipesService.createRecipe(recipeData);

    } catch (error) {
      console.log(error);

    }
  }

  async openRecipeForm() {
    try {
      await recipesService.initializeNewRecipe();
    } catch (error) {
      console.log(error);

    }
  }
}