const { faker } = require("@faker-js/faker");
const { Role } = require("../models");

faker.locale = "es";

module.exports = async () => {
  const role = [];
  role.push(
    {
      code: 100,
      name: "Lector",
      description:
        "Permiso mínimo que obtiene un usuario al registrarse al Blog. Puede comentar artículos.",
    },
    {
      code: 200,
      name: "Escritor",
      description: "Además de los permisos del Lector, además puede realizar CRUD de sus artículos",
    },
    {
      code: 300,
      name: "Editor",
      description:
        "Mismos permisos que el Escritor, y además puede editar artículos de cualquier escritor. No puede borrar artículos que no sean de su auditoría. Puede editar/borrar comentarios.",
    },
    {
      code: 400,
      name: "Administrador",
      description:
        "Puede hacer CRUD de cualquier entidad, incluyendo, por ejemplo, eliminar usuarios",
    },
  );

  await Role.bulkCreate(role);
  console.log("[Database] Se corrió el seeder de Role.");
};
