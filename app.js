/**
 * root file for api configuration
 */
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");
const dbConfig = require("./config/database.config");
const moongoose = require("mongoose");

moongoose.Promise = global.Promise;
moongoose
  .connect(dbConfig.url)
  .then(() => {
    console.log("successfully connected to the database");
  })
  .catch(() => {
    console.log("unable to connect to the database  Exiting now..");
    process.exit();
  });

// create express app
const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);
// listen for requests
const server = app.listen(3000, function() {
  console.log("app running on", server.address().port);
});
