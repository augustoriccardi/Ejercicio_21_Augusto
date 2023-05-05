const { Sequelize, Model, DataTypes } = require("sequelize");
const { formatDistanceToNow } = require("date-fns");
const User = require("./User");

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
    return Article;
  }

  get createdAgo() {
    return formatDistanceToNow(this.createdAt);
  }
}

module.exports = Article;
