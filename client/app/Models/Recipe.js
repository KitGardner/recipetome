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
    this.showFavoriteIcon = false;
    this.userCanEdit = false;
    this.userCanDelete = false;
    this.userFavorited = false;
    this.userLiked = false;
  }

  setCanDelete(email) {
    if (this.createdBy == email) {
      this.userCanDelete = true;
    }
  }

  setCanEdit(email) {
    if (this.createdBy == email) {
      this.userCanEdit = true;
    }
  }

  setIsFavorited(email) {
    if (this.favorited.includes(email)) {
      this.userFavorited = true;
    } else {
      this.userFavorited = false;
    }
  }

  setShowFavoriteIcon(show) {
    this.showFavoriteIcon = show;
  }

  setUserLiked(email) {
    if (this.likes.includes(email)) {
      this.userLiked = true;
    } else {
      this.userLiked = false;
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
          <div class="col-md-12 d-flex white">
            ${this.ingredients}
          </div>
        </div>
        <div class="row">
          <div class="col-md-8">
            <button class="btn btn-primary mt-4 mb-n5" onclick="app.recipesController.viewRecipe('${this.Id}')">View Recipe</button>`;
    if (this.userCanEdit) {
      listTemplate += `<button class="btn btn-primary mt-4 mb-n5" onclick="app.recipesController.editRecipe('${this.Id}')">Edit Recipe</button>`;
    }
    listTemplate +=
      `</div>
          <div class="col-md-4 d-flex justify-content-between">`;
    if (this.userLiked) {
      listTemplate += `<i class="fa fa-thumbs-up icon blue" onclick="app.likesController.unLikeRecipe('${this.Id}')">${this.likes.length}</i>`;
    } else {
      listTemplate += `<i class="fa fa-thumbs-up icon" onclick="app.likesController.likeRecipe('${this.Id}')">${this.likes.length}</i>`
    }

    if (this.showFavoriteIcon) {
      if (this.userFavorited) {
        listTemplate += `<i class="fa fa-heart icon red" onclick="app.favoritesController.unFavoriteRecipe('${this.Id}')"></i>`
      } else {
        listTemplate += `<i class="fa fa-heart icon" onclick="app.favoritesController.favoriteRecipe('${this.Id}')"></i>`
      }
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

  get ViewTemplate() {
    return `
    <div class="col-12">
      <div>
        <img src="${this.imgUrl}" alt="" class="img-fluid">
      </div>
      <div>
        <h2>${this.name}</h2>
      </div>
      <div>
        ${this.description}
      </div>
      <div>
        <h3>Ingredients<h3>
      </div>
      <div>
        ${this.ingredients}
      </div>
      <div>
        <h3>Directions<h3>
      </div>
      <div>
        ${this.directions}
      </div>
      <div>
        <h3>Comments<h3>
      </div>
      <div>
        Comments placeholder
      </div>
      
      <button onclick="app.recipesController.getAllRecipes()">Back to listing</button>
  </div>`
  }
}