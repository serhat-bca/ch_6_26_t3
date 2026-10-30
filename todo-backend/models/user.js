const { Model, DataTypes } = require("sequelize");
const sequelizeDB = require("../util/db");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      validate: {
        len: [3],
      },
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [3],
      },
    },
    passwordHash: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeDB,
    tableName: "users",
    timestamps: false,
    underscored: true,
  },
);

module.exports = User;
