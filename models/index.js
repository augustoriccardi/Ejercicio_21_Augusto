const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("ha_ejercicio_21", "root", "root", {
  host: "127.0.0.1",
  port: "3306",
  dialect: "mysql",
  logging: false,
});

const User = require("./User");
const Comment = require("./Comment");
const Article = require("./Article");

User.initModel(sequelize);
Comment.initModel(sequelize);
Article.initModel(sequelize);

module.exports = {
  sequelize,
  User,
  Comment,
  Article,
};
