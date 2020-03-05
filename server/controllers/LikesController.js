import express from "express";
import BaseController from "../utils/BaseController";
import auth0Provider from "@bcwdev/auth0Provider";
import likesService from "../services/LikesService.js"

export class LikesController extends BaseController {
  constructor() {
    super("api/likes");
    this.router = express
      .Router()
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .get("", this.getAllLikes)
      .use(auth0Provider.hasRoles("User"))
      .post("", this.likeRecipe)
      .delete("/:recipeId", this.unLikeRecipe);
  }

  async getAllLikes(req, res, next) {
    try {
      let likes = await likesService.getAllLikes();
      res.send(likes);
    } catch (error) {
      next(error);
    }
  }

  async likeRecipe(req, res, next) {
    try {
      let likingResult = await likesService.likeRecipe(req.body, req.userInfo);
      res.send(likingResult);
    } catch (error) {
      next(error)
    }
  }

  async unLikeRecipe(req, res, next) {
    try {
      let unLikingResult = await likesService.unLikeRecipe(req.params.recipeId, req.userInfo);
      res.send(unLikingResult);
    } catch (error) {
      next(error)
    }
  }
}