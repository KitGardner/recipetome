export default class Recipe {
  constructor(recipeData) {
    this.Id = recipeData || "";
    this.name = recipeData.name;
    this.description = recipeData.description;
    this.createdBy = recipeData.createdBy;
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
  <div class="col-3">
    <div>
      <img src="http://placehold.it/200x200" alt="">
      <h5>${this.name}</h5>
      <p>Created By: ${this.createdBy}</p>
      <p>${this.description}</p>`;

    if (this.ingredients.length > 0) {
      let ingredientBaseTemp = "<ul>Ingredients";

      this.ingredients.forEach(ingredient => {
        ingredientBaseTemp += `<li>${ingredient}</li>`
      });

      ingredientBaseTemp += "</ul>";
      listTemplate += ingredientBaseTemp;
    }

    listTemplate += `
      <button>View Recipe</button>
      <p>like</p>
      <p>favorite</p>
    </div>
  </div>`;

    return listTemplate;
  }
}