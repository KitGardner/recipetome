import express from "express";
import BaseController from "../utils/BaseController";
import auth0Provider from "@bcwdev/auth0Provider";

export class RecipesController extends BaseController {
  constructor() {
    super("api/recipes");
    this.router = express
      .Router()
      .get("", this.getAll)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(auth0Provider.hasRoles("User"))
      .post("", this.create)
      .delete("", this.delete);
  }

  async getAll(req, res, next) {
    res.send("Got the recipes!");
  }

  async create(req, res, next) {
    res.send("Created the recipe!");
  }

  async delete(req, res, next) {
    res.send("Deleted");
  }
}