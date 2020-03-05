import { resource } from "../resource.js";
import store from "../store.js";

class LikesService {
  async getAllLikes() {
    let likes = await resource.get("api/likes");
    store.State.likes = likes;
  }
  async likeRecipe(recipeId) {
    let result = await resource.post("api/likes", { recipeId: recipeId });

    if (!result.email) {
      throw new Error("There was an error liking the recipe");
    }

    let recipeIndex = store.State.recipes.findIndex(r => r.Id == result.recipeId);
    let likedRecipe = store.State.recipes[recipeIndex];
    likedRecipe.likes.push(result.email);
    likedRecipe.setUserLiked(result.email);
    store.State.recipes[recipeIndex] = likedRecipe;
    store.commit("recipes", store.State.recipes);
  }

  async unLikeRecipe(recipeId) {
    let result = await resource.delete("api/likes/" + recipeId);

    if (!result.email) {
      throw new Error("There was an error unLiking this recipe. No email returned")
    }

    let recipeIndex = store.State.recipes.findIndex(r => r.Id == recipeId);
    let likedRecipe = store.State.recipes[recipeIndex];

    let emailIndex = likedRecipe.likes.findIndex(l => l == result.email);

    likedRecipe.likes.splice(emailIndex, 1);
    likedRecipe.setUserLiked(result.email);
    store.State.recipes[recipeIndex] = likedRecipe;
    store.commit("recipes", store.State.recipes);
  }
}

let likesService = new LikesService()
export default likesService;