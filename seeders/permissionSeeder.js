const { faker } = require("@faker-js/faker");
const { Permission } = require("../models");

faker.locale = "es";

module.exports = async () => {
  const permissions = [];
  permissions.push(
    {
      name: "create-comment",
    },
    {
      name: "edit-comment",
    },
    {
      name: "delete-comment",
    },
    {
      name: "create-article",
    },
    {
      name: "edit-article",
    },
    {
      name: "delete-article",
    },
    {
      name: "create-user",
    },
    {
      name: "edit-user",
    },
    {
      name: "delete-user",
    },
    {
      name: "view-articles",
    },
    {
      name: "view-comments",
    },
    {
      name: "view-users",
    },
  );

  await Permission.bulkCreate(permissions);
  console.log("[Database] Se corrió el seeder de Permission.");
};
