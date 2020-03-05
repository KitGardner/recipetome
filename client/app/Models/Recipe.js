export default class Recipe {
  constructor(recipeData) {
    if (!recipeData) {
      return this;
    }
    this.Id = recipeData.id || "";
    this.name = recipeData.name;
    this.description = recipeData.description;
    this.createdBy = recipeData.createdBy.name;
    this.creatorImgUrl = recipeData.createdBy.picture;
    this.ingredients = recipeData.ingredients;
    this.directions = recipeData.directions;
    this.favorited = recipeData.favorited || [];
    this.comments = recipeData.comments || [];
    this.likes = recipeData.likes || [];
    this.imgUrl = recipeData.imgUrl;
    this.userCanDelete = false;
    this.userFavorited = false;
    this.userLiked = false;
  }

  setCanDelete(email) {
    if (this.createdBy == email) {
      this.userCanDelete = true;
    }
  }

  setIsFavorited(email) {
    if (this.favorited.includes(email)) {
      this.userFavorited = true;
    } else {
      this.userFavorited = false;
    }
  }

  setUserLiked(email) {
    if (this.likes.includes(email)) {
      this.userLiked = true;
    }
  }

  get Template() {
    return ``;
  }

  get ListTemplate() {
    let listTemplate = `
    <div class="col-lg-3 col-md-6 col-sm-12 pb-2">
    <div class="row">
      <div class="col-md-12 ">
      <div class="p-2 recipe-page">
        <div class="row">`;
    if (this.userCanDelete) {
      listTemplate += `<i class="fa fa-trash icon" onclick="app.recipesController.deleteRecipe('${this.Id}')"></i>`;
    }
    listTemplate += `    
        </div>
        <div class="row">
          <div class="col-md-12  d-flex justify-content-center">
            <img class="img-fluid" src="${this.imgUrl}" alt="">
          </div>
        </div>
        <div class="row d-flex justify-content-center">
          <div class="col-md-12">
            <h5 class="recipe-title">${this.name}</h5>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <h5>Created By: <img class="user-img-small rounded-circle" src="${this.creatorImgUrl}" alt=""> ${this.createdBy}</h5>
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
            <button class="btn btn-primary mt-4 mb-n5">View Recipe</button>
          </div>
          <div class="col-md-4 d-flex justify-content-between">`;
    if (this.userLiked) {
      listTemplate += `<i class="fa fa-thumbs-up icon blue"></i>`;
    } else {
      listTemplate += `<i class="fa fa-thumbs-up icon"></i>`
    }

    if (this.userFavorited) {
      listTemplate += `<i class="fa fa-heart icon red" onclick="app.favoritesController.unFavoriteRecipe('${this.Id}')"></i>`
    } else {
      listTemplate += `<i class="fa fa-heart icon" onclick="app.favoritesController.favoriteRecipe('${this.Id}')"></i>`
    }

    listTemplate += `        
          </div >
        </div >
      </div >
      </div >
    </div >
  </div > `;

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