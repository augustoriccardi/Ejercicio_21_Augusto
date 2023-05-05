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

const User = require("./User");
const Comment = require("./Comment");
const Article = require("./Article");
sequelize.sync({ alter: true });
User.initModel(sequelize);
Comment.initModel(sequelize);
Article.initModel(sequelize);

module.exports = {
  sequelize,
  User,
  Comment,
  Article,
};
