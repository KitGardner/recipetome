export default class Recipe {
  constructor(recipeData) {
    if (!recipeData) {
      return this;
    }
    this.Id = recipeData || "";
    this.name = recipeData.name;
    this.description = recipeData.description;
    this.createdBy = recipeData.createdBy;
    this.creatorImgUrl = recipeData.creatorImgUrl;
    this.ingredients = recipeData.ingredients;
    this.directions = recipeData.directions;
    this.favorited = recipeData.favorited;
    this.comments = recipeData.comments;
    this.likes = recipeData.likes;
    this.imgUrl = recipeData.imgUrl;
  }

  get Template() {
    return ``;
  }

  get ListTemplate() {
    let listTemplate = `
    <div class="col-3 pb-5">
    <div class="row">
      <div class="col-md-12 recipe-page">
        <div class="row">
          <div class="col-md-12  d-flex justify-content-center">
            <img class="recipe-img-small" src="${this.imgUrl}" alt="">
          </div>
        </div>
        <div class="row d-flex justify-content-center">
          <div class="col-md-12">
            <h5 class="recipe-title">${this.name}</h5>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <h5>Created By: <img class="user-img-small" src="${this.creatorImgUrl}" alt="">${this.createdBy}</h5>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <p class="white">${this.description}</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <h5>Ingredients</h5>
          </div>
          <div class="col-md-12 d-flex ">
            ${this.ingredients}
          </div>
        </div>
        <div class="row">
          <div class="col-md-8">
            <button class="btn btn-primary mt-3 mb-n5">View Recipe</button>
          </div>
          <div class="col-md-4 d-flex justify-content-between">
            <i class="fa fa-thumbs-up icon blue"></i>
            <i class="fa fa-heart icon red"></i>
          </div>
        </div>
      </div>
    </div>
  </div>`;

    return listTemplate;
  }

  get CreateTemplate() {
    return `
    <div class="col-md-12">
      <form onsubmit="app.recipesController.createRecipe(event)">
        <img src="http://placehold.it/350x200" alt="">
        <div class="input-group">
          <label for="Id"></label>
          <input type="text" name="Id" hidden>
        </div>
        <div class="input-group">
          <label for="imgUrl">Recipe Image URL: </label>
          <input type="text" name="imgUrl" class="input-field">
        </div>
        <div class="input-group">
          <label for="name">Recipe Name: </label>
          <input type="text" name="name" class="input-field">
        </div>
        <div class="input-group">
          <label for="description">Recipe Description: </label>
          <input type="text" name="description" class="input-field">
        </div>
        <div class="input-group">
          <label for="ingredients">Ingredients: </label>
          <textarea style="display: block;" name="ingredients" id="" cols="30" rows="10"></textarea>
        </div>
        <div class="input-group">
          <label for="directions">Directions: </label>
          <textarea style="display: block;" name="directions" id="" cols="60" rows="10"></textarea>
        </div>        
        <button type="submit">Save Recipe</button>
      </form>
    </div>`
  }
}