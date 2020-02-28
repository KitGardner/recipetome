import { AuthController } from "./auth/AuthController.js";
import { resource } from "./resource.js";
import RecipesController from "./controllers/RecipesController.js";

class App {
  authController = new AuthController();
  recipesController = new RecipesController();
}

window["app"] = new App();
