import express from "express";
import BaseController from "../utils/BaseController";
import auth0Provider from "@bcwdev/auth0Provider";
import favoritesService from "../services/FavoritesService";

export class FavoritesController extends BaseController {
  constructor() {
    super("api/favorites");
    this.router = express
      .Router()
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(auth0Provider.hasRoles("User"))
      .get("", this.getUserFavorites)
      .post("", this.favoriteRecipe)
      .delete("/:recipeId", this.unfavoriteRecipe);
  }

  async getUserFavorites(req, res, next) {
    try {
      let favorites = await favoritesService.getUserFavorites(req.userInfo);
      res.send(favorites);
    } catch (error) {
      next(error);
    }
  }

  async favoriteRecipe(req, res, next) {
    try {
      let favoritingResult = await favoritesService.favoriteRecipe(req.body, req.userInfo);
      res.send(favoritingResult);
    } catch (error) {
      next(error)
    }
  }

  async unfavoriteRecipe(req, res, next) {
    try {
      let unfavoritingResult = await favoritesService.unFavoriteRecipe(req.params.recipeId, req.userInfo);
      res.send(unfavoritingResult);
    } catch (error) {
      next(error)
    }
  }
}