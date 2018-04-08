const faker = require("faker");
const appRouter = function(app) {
  app.get("/", function(req, res) {
    res.status(200).send("welcome to express js by mwaz");
  });
  app.get("/user", function(req, res) {
    const data = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      username: faker.internet.userName(),
      email: faker.internet.email()
    };
    res.status(200).send(data);
  });
  app.get("/user/:num", function(req, res) {
    const users = [];
    const num = req.params.num;

    if (isFinite(num) && num > 0) {
      for (i = 0; i <= num - 1; i++) {
        users.push({
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          username: faker.internet.userName(),
          email: faker.internet.email()
        });
      }
      res.status(200).send(users);
    } else {
      res.status(400).send({ message: "invalid number supplied" });
    }
  });
};

module.exports = appRouter;
