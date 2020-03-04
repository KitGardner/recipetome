export default class Recipe {
  constructor(recipeData) {
    this.Id = recipeData || "";
    this.name = recipeData.name;
    this.description = recipeData.description;
    this.createdBy = recipeData.createdBy;
    this.creatorImgUrl = recipeData.creatorImgUrl;
    this.ingredients = recipeData.ingredients;
    this.direction = recipeData.direction;
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
            <img src="http://placehold.it/350x200" alt="">
          </div>
        </div>
        <div class="row d-flex justify-content-center">
          <div class="col-md-12">
            <h5 class="recipe-title">${this.name}</h5>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <h5>Created By: <img src="http://placehold.it/50x50" alt=""> User</h5>
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
            <ul class="horizontal-list">`;
    this.ingredients.forEach(ingredient => {
      listTemplate += `<li>${ingredient}</li>`
    });

    listTemplate += `
            </ul>
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
}