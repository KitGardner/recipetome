import { Auth0Provider } from "../auth/Auth0Provider.js"
import recipesService from "../Services/RecipesService.js";
import store from "../store.js";

function drawRecipes() {
  let recipes = store.State.recipes;
  let template = "";

  recipes.forEach(recipe => {
    template += recipe.ListTemplate;
  });
  closeRecipeForm();
  document.getElementById("pageContent").innerHTML = template;

}

function drawMyRecipes() {
  let myRecipes = store.State.recipes.filter(r => r.createdBy == Auth0Provider.userInfo.email);

  let template = "";

  myRecipes.forEach(recipe => {
    template += recipe.ListTemplate;
  });

  closeRecipeForm();
  document.getElementById("pageContent").innerHTML = template;
}

function drawFavoriteRecipes() {
  let favoriteRecipes = store.State.recipes.filter(r => r.favorited.includes(Auth0Provider.userInfo.email));

  let template = "";

  favoriteRecipes.forEach(recipe => {
    template += recipe.ListTemplate;
  });

  closeRecipeForm();
  document.getElementById("pageContent").innerHTML = template;
}

function drawRecipeView(id) {
  let recipe = store.State.recipes.find(r => r.Id == id);
  document.getElementById("pageContent").innerHTML = recipe.ViewTemplate;
}

function drawActiveRecipe() {
  document.getElementById("recipeForm").hidden = false;
}

function closeRecipeForm() {
  document.getElementById("recipeForm").hidden = true;
}

function drawHeaderButtons() {
  document.getElementById("ViewButtons").innerHTML = `
  <button onclick="app.recipesController.getAllRecipes()">Show All Recipes</button>
  <button onclick="app.recipesController.getMyRecipes()">Show My Recipes</button>
  <button onclick="app.recipesController.getFavoriteRecipes()">Show Favorited Recipes</button>
  <button onclick="app.recipesController.openRecipeForm()">Add New Recipe</button>
  `;
}

export default class RecipesController {
  constructor() {
    Auth0Provider.onAuth(this.setUserData);
    Auth0Provider.onAuth(drawHeaderButtons);
    Auth0Provider.onUnAuth(this.getRecipes);
    this.getRecipes();
    store.subscribe("recipes", drawRecipes);
    store.subscribe("activeRecipe", drawActiveRecipe);
  }

  async getRecipes() {
    try {
      await recipesService.getRecipes();
    } catch (error) {
      console.log(error);

    }
  }

  getAllRecipes() {
    drawRecipes();
  }

  getMyRecipes() {
    drawMyRecipes();
  }

  getFavoriteRecipes() {
    drawFavoriteRecipes();
  }

  viewRecipe(id) {
    drawRecipeView(id);
  }

  async createRecipe(event) {
    try {
      event.preventDefault();

      let form = event.target;
      let recipeData = {};

      recipeData.imgUrl = form.imgUrl.value;
      recipeData.name = form.name.value;
      recipeData.description = form.description.value;
      recipeData.ingredients = form.ingredients.value;
      recipeData.directions = form.directions.value;

      if (form.Id.value) {
        recipeData.Id = form.Id.value;
        await recipesService.updateRecipe(recipeData);
      } else {
        await recipesService.createRecipe(recipeData);
      }
      form.reset();
      closeRecipeForm();

    } catch (error) {
      console.log(error);

    }
  }

  editRecipe(id) {
    debugger;
    let recipe = store.State.recipes.find(r => r.Id == id);

    let form = document.getElementById("createForm");
    form.Id.value = recipe.Id;
    form.imgUrl.value = recipe.imgUrl;
    form.name.value = recipe.name;
    form.description.value = recipe.description;
    form.ingredients.value = recipe.ingredients;
    form.directions.value = recipe.directions;

    drawActiveRecipe();
  }

  async deleteRecipe(id) {
    try {
      await recipesService.deleteRecipe(id);
    } catch (error) {
      console.log(error);

    }
  }

  async setUserData() {
    try {
      await recipesService.setUserData(Auth0Provider.userInfo);
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