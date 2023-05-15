const { faker } = require("@faker-js/faker");
const { permission_role } = require("../models");

faker.locale = "es";

module.exports = async () => {
  const permissions = [];
  permissions.push(
    {
      id: 1,
      permissionId: 1,
      roleId: 4,
    },
    {
      id: 2,
      permissionId: 2,
      roleId: 4,
    },
    {
      id: 3,
      permissionId: 3,
      roleId: 4,
    },
    {
      id: 4,
      permissionId: 4,
      roleId: 4,
    },
    {
      id: 5,
      permissionId: 5,
      roleId: 4,
    },
    {
      id: 6,
      permissionId: 6,
      roleId: 4,
    },
    {
      id: 7,
      permissionId: 7,
      roleId: 4,
    },
    {
      id: 8,
      permissionId: 8,
      roleId: 4,
    },
    {
      id: 9,
      permissionId: 9,
      roleId: 4,
    },
    {
      id: 10,
      permissionId: 10,
      roleId: 4,
    },
    {
      id: 11,
      permissionId: 11,
      roleId: 4,
    },
    {
      id: 12,
      permissionId: 12,
      roleId: 4,
    },
    {
      id: 13,
      permissionId: 1,
      roleId: 3,
    },
    {
      id: 14,
      permissionId: 2,
      roleId: 3,
    },
    {
      id: 15,
      permissionId: 3,
      roleId: 3,
    },
    {
      id: 16,
      permissionId: 4,
      roleId: 3,
    },
    {
      id: 17,
      permissionId: 5,
      roleId: 3,
    },
    {
      id: 18,
      permissionId: 6,
      roleId: 3,
    },
    {
      id: 19,
      permissionId: 10,
      roleId: 3,
    },
    {
      id: 20,
      permissionId: 11,
      roleId: 3,
    },
    {
      id: 21,
      permissionId: 1,
      roleId: 2,
    },
    {
      id: 22,
      permissionId: 4,
      roleId: 2,
    },
    {
      id: 23,
      permissionId: 5,
      roleId: 2,
    },
    {
      id: 24,
      permissionId: 6,
      roleId: 2,
    },
    {
      id: 25,
      permissionId: 1,
      roleId: 1,
    },
  );

  await permission_role.bulkCreate(permissions);
  console.log("[Database] Se corrió el seeder de Permission Role.");
};
