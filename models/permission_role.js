const { Model, DataTypes } = require("sequelize");

class permission_role extends Model {
  static initModel(sequelize) {
    permission_role.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
      },
      {
        sequelize,
        modelName: "permission_role",
      },
    );
    return permission_role;
  }
}

module.exports = permission_role;
