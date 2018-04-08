const moongoose = require("mongoose");

const RecipeSchema = moongoose.Schema(
  {
    recipeName: String,
    recipeIngredients: String,
    recipeMethods: String
  },
  {
    timestamps: true
  }
);

module.exports = moongoose.model("Recipes", RecipeSchema);
