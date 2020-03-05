import likesService from "../Services/LikesService.js";

export default class LikesController {

  async getAllLikes() {
    try {
      await likesService.getAllLikes();
    } catch (error) {
      console.log(error);
    }
  }

  async likeRecipe(recipeId) {
    try {
      await likesService.likeRecipe(recipeId);
    } catch (error) {
      console.log(error);
    }
  }

  async unLikeRecipe(recipeId) {
    try {
      await likesService.unLikeRecipe(recipeId);
    } catch (error) {
      console.log(error);
    }
  }
}