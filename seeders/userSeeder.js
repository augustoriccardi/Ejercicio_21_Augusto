const { faker } = require("@faker-js/faker");
const { User } = require("../models");

faker.locale = "es";

module.exports = async () => {
  const users = [];

  for (let i = 0; i < 20; i++) {
    users.push({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      password: "1234",
    });
  }

  await User.bulkCreate(users);
  console.log("[Database] Se corrió el seeder de Author.");
};
