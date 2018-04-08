import { Mongoose } from "mongoose";

const moongoose = require("mongoose");

const RecipeSchema = moongoose.Schema(
  {
    recipeName: String,
    recipeIngredients: String,
    recipeDescription: String
  },
  {
    timestamps: true
  }
);

module.exports = Mongoose.module("Recipes", RecipeSchema);
