import mongoose from "mongoose";
import ValueSchema from "../models/Value.js";
import ProfileSchema from "../models/Profile.js";
import Recipe from "../models/Recipe.js";

class DbContext {
  Values = mongoose.model("Value", ValueSchema);
  Profile = mongoose.model("Profile", ProfileSchema);
  Recipe = mongoose.model("Recipe", Recipe)
}

export const dbContext = new DbContext();
