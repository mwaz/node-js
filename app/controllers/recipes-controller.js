const Recipe = require("../models/recipes.model");

exports.create = (req, res) => {
  //validate the request
  if (
    !req.body.recipeName ||
    !req.body.recipeIngredients ||
    !req.body.recipeMethods
  ) {
    return res.status(400).send({
      message: "Recipe details cannot be empty"
    });
  }
  // Create a new recipe
  const recipe = new Recipe({
    recipeName: req.body.recipeName,
    recipeIngredients: req.body.recipeIngredients,
    recipeMethods: req.body.recipeMethods
  });

  //save the recipe in the database
  recipe
    .save()
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err =>
      res.status(500).send({
        message: err.message || "Some error occurred while creating the recipe."
      })
    );
};
exports.findAll = (req, res) => {
  Recipe.find()
    .then(recipes => {
      res.status(200).send(recipes);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving your recipes."
      });
    });
};
exports.findOne = (req, res) => {
  Recipe.findById(req.params.recipeID)
    .then(recipe => {
      if (!recipe) {
        return res.status(404).send({
          message: `No recipe found with id ${req.params.recipeID}`
        });
      }
      res.status(200).send(recipe);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `No recipe found with id ${req.params.recipeID}`
        });
      }
      res.status(500).send({
        message:
          err.message ||
          `Some error occurred while finding  the recipe with id ${
            req.params.recipeID
          }`
      });
    });
};
exports.update = (req, res) => {
  if (
    !req.body.recipeName ||
    !req.body.recipeIngredients ||
    !req.body.recipeMethods
  ) {
    return res.status(400).send({
      message: "Recipe details cannot be empty"
    });
  }
  Recipe.findByIdAndUpdate(
    req.params.recipeID,
    {
      recipeName: req.body.recipeName,
      recipeIngredients: req.body.recipeIngredients,
      recipeMethods: req.body.recipeMethods
    },
    { new: true }
  )
    .then(recipe => {
      if (!recipe) {
        return res.status(404).send({
          message: `No recipe found with the id ${req.params.recipeID}`
        });
      }
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: `No recipe found with the id ${req.params.recipeID}`
        });
      }
      res.status(500).send({
        message: `Error updating recipe with id ${req.params.recipeID}`
      });
    });
};
exports.delete = (req, res) => {
  Recipe.findByIdAndRemove(req.params.recipeID)
    .then(recipe => {
      if (!recipe) {
        return res.status(404).send({
          message: `No recipe found with the id ${req.params.recipeID}`
        });
      }
      res.send({
        message: "Recipe Deleted Successfully"
      });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: `No recipe found with the id ${req.params.recipeID}`
        });
      }
      res.status(500).send({
        message: `Error deleting recipe with id ${req.params.recipeID}`
      });
    });
};
