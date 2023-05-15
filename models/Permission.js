const { Model, DataTypes } = require("sequelize");

class Permission extends Model {
  static initModel(sequelize) {
    Permission.init(
      {
        name: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: "permission",
      },
    );
    return Permission;
  }
}

module.exports = Permission;
