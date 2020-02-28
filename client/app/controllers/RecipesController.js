import { resource } from "../resource.js";
import { Auth0Provider } from "../auth/Auth0Provider.js"

export default class RecipesController {
  constructor() {
    Auth0Provider.onAuth(this.getRecipes);
  }

  async getRecipes() {
    try {
      await resource.get("api/recipes")
      //await resource.post("api/recipes", data) syntax for sending data
    } catch (error) {

    }
  }
}