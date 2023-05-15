const { Sequelize } = require("sequelize");

require("dotenv").config();
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_CONNECTION,
    logging: false,
  },
);

const permission_role = require("./permission_role");
const Role = require("./Role");
const Permission = require("./Permission");
const User = require("./User");
const Comment = require("./Comment");
const Article = require("./Article");

permission_role.initModel(sequelize);
Role.initModel(sequelize);
Permission.initModel(sequelize);
User.initModel(sequelize);
Comment.initModel(sequelize);
Article.initModel(sequelize);

Article.hasMany(Comment);
Comment.belongsTo(Article);
User.hasMany(Article);
Article.belongsTo(User);
Role.hasMany(User);
User.belongsTo(Role);
Permission.belongsToMany(Role, { through: "permission_role" });
Role.belongsToMany(Permission, { through: "permission_role" });

module.exports = {
  sequelize,
  User,
  Comment,
  Article,
  Role,
  Permission,
  permission_role,
};
