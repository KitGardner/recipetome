import express from "express";
import BaseController from "../utils/BaseController";
import auth0Provider from "@bcwdev/auth0Provider";
import recipesService from "../services/RecipesService.js";

export class RecipesController extends BaseController {
  constructor() {
    super("api/recipes");
    this.router = express
      .Router()
      .get("", this.getAllRecipes)
      .get("/:id", this.getRecipeById)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(auth0Provider.hasRoles("User"))
      .post("", this.createRecipe)
      .post("/:recipeId/favorite", this.favoriteRecipe)
      .post("/:recipeId/like", this.likeRecipe)
      .put("/:id", this.updateRecipe)
      .delete("/:id", this.deleteRecipe)
      .delete("/:recipeId/favorite", this.unfavoriteRecipe)
      .delete("/:recipeId/like", this.unLikeRecipe);
  }

  async getAllRecipes(req, res, next) {
    try {
      let recipes = await recipesService.getAllRecipes();
      res.send(recipes);
    } catch (error) {
      next(error)
    }
  }

  async getRecipeById(req, res, next) {
    try {
      let recipe = await recipesService.getRecipeById(req.params.id);
      res.send(recipe);
    } catch (error) {
      next(error);
    }
  }

  async createRecipe(req, res, next) {
    try {
      let createdRecipe = await recipesService.createRecipe(req.body, req.userInfo);
      res.send(createdRecipe);
    } catch (error) {
      next(error)
    }
  }

  async updateRecipe(req, res, next) {
    try {
      let updatedRecipe = await recipesService.updateRecipe(req.params.id, req.body, req.userInfo);
      res.send(updatedRecipe);
    } catch (error) {
      next(error);
    }
  }

  async favoriteRecipe(req, res, next) {
    try {
      let favoritingResult = await recipesService.favoriteRecipe(req.params.recipeId, req.userInfo);
      res.send(favoritingResult);
    } catch (error) {
      next(error)
    }
  }

  async unfavoriteRecipe(req, res, next) {
    try {
      let unfavoritingResult = await recipesService.unFavoriteRecipe(req.params.recipeId, req.userInfo);
      res.send(unfavoritingResult);
    } catch (error) {
      next(error)
    }
  }

  async likeRecipe(req, res, next) {
    try {
      let favoritingResult = await recipesService.LikeRecipe(req.params.recipeId, req.userInfo);
      res.send(favoritingResult);
    } catch (error) {
      next(error)
    }
  }

  async unLikeRecipe(req, res, next) {
    try {
      let unfavoritingResult = await recipesService.unLikeRecipe(req.params.recipeId, req.userInfo);
      res.send(unfavoritingResult);
    } catch (error) {
      next(error)
    }
  }

  async deleteRecipe(req, res, next) {
    try {
      let result = await recipesService.deleteRecipe(req.params.id, req.userInfo);
      res.send(result);
    } catch (error) {
      next(error)
    }
  }
}