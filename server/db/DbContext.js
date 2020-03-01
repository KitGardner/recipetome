import mongoose from "mongoose";
import ValueSchema from "../models/Value.js";
import ProfileSchema from "../models/Profile.js";
import Recipe from "../models/Recipe.js";
import Favorite from "../models/Favorite.js";
import Like from "../models/Like.js";

class DbContext {
  Values = mongoose.model("Value", ValueSchema);
  Profile = mongoose.model("Profile", ProfileSchema);
  Recipe = mongoose.model("Recipe", Recipe);
  Favorite = mongoose.model("Favorite", Favorite);
  Like = mongoose.model("Like", Like);
}

export const dbContext = new DbContext();
