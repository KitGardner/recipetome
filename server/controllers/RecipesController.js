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
      .put("/:id", this.updateRecipe)
      .delete("/:id", this.deleteRecipe);
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

  async deleteRecipe(req, res, next) {
    try {
      let result = await recipesService.deleteRecipe(req.params.id, req.userInfo);
      res.send(result);
    } catch (error) {
      next(error)
    }
  }
}