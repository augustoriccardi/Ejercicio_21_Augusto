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

User.initModel(sequelize);
Comment.initModel(sequelize);
Article.initModel(sequelize);

Comment.belongsTo(Article);
Article.hasMany(Comment);
Article.belongsTo(User);
User.hasMany(Article);

module.exports = {
  sequelize,
  User,
  Comment,
  Article,
};
