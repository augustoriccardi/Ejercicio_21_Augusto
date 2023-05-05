const { Model, DataTypes } = require("sequelize");
const comments = require("./Comment");
class Article extends Model {
  static initModel(sequelize) {
    Article.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        title: {
          type: DataTypes.STRING,
        },
        content: {
          type: DataTypes.TEXT,
        },
      },
      {
        sequelize,
        modelName: "article",
      },
    );
    Article.hasMany(comments);
    return Article;
  }
}

module.exports = Article;
