const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static initModel(sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        firstname: {
          type: DataTypes.STRING,
        },
        lastname: {
          type: DataTypes.STRING,
        },
        password: {
          type: DataTypes.STRING,
        },
        email: {
          type: DataTypes.STRING,
        },
        role: {
          type: DataTypes.BIGINT,
          defaultValue: false,
        },
      },
      {
        sequelize,
        modelName: "user",
      },
    );
    return User;
  }
}

module.exports = User;
