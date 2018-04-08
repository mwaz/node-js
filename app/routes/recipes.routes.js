const faker = require("faker");
const appRouter = function(app) {
  const recipes = require("../controllers/recipes-controller.js");

  // Create a new note
  app.post("/recipes", recipes.create);

  // Fetch all created recipes
  app.get("/recipes", recipes.findAll);

  // Fetch a single recipe using its ID
  app.get("/recipes/:recipeID", recipes.findOne);

  // Update a recipe with noteId
  app.put("/recipes/:recipeID", recipes.update);

  // Delete a note
  app.delete("/recipes/:recipeID", recipes.delete);
};

module.exports = appRouter;
