import { dbContext } from "../db/DbContext.js";
import { BadRequest, Unexpected, UnAuthorized } from "../utils/Errors.js";
import { profilesService } from "./ProfilesService.js";

class LikesService {
  async getAllLikes() {
    return await dbContext.Like.find({}).populate("User", ["name"]);
  }
  async likeRecipe(likeData, userInfo) {
    let existingRecipe = await dbContext.Recipe.findById(likeData.recipeId);

    if (!existingRecipe) {
      throw new BadRequest("There is no recipe with the id " + likeData.recipeId);
    }

    let user = await profilesService.getProfile(userInfo);

    let likingResult = await dbContext.Like.create({ User: user.id, Recipe: likeData.recipeId });
    if (!likingResult) {
      throw new Unexpected("There was an error favoriting the recipe with id " + likeData.recipeId);
    }

    let newLike = await dbContext.Like.findById(likingResult.id).populate("User", ["name"])

    return {
      recipeId: newLike.Recipe,
      email: newLike.User.name
    };
  }

  async unLikeRecipe(recipeId, userInfo) {
    let user = await profilesService.getProfile(userInfo)
    let likeRecords = await dbContext.Like.find({ User: user.id, Recipe: recipeId });

    if (likeRecords.length == 0) {
      throw new Unexpected("No favorite record were found to unfavorite")
    };

    if (likeRecords.length > 1) {
      throw new Unexpected("Mulitple favoriting records were found for this recipe and user");
    }

    let unLikeResult = await dbContext.Like.findByIdAndRemove(likeRecords[0].id);
    if (!unLikeResult) {
      throw new Unexpected("There was an error unfavoriting this recipe for the user");
    }

    return {
      email: user.name
    };
  }
}

const likesService = new LikesService();
export default likesService;