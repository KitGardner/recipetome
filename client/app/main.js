import { AuthController } from "./auth/AuthController.js";
import { resource } from "./resource.js";
import RecipesController from "./controllers/RecipesController.js";
import FavoritesController from "./controllers/FavoritesController.js";
import LikesController from "./controllers/LikesController.js";

class App {
  authController = new AuthController();
  recipesController = new RecipesController();
  favoritesController = new FavoritesController();
  likesController = new LikesController();
}

window["app"] = new App();
