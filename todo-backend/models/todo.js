const { Model, DataTypes } = require("sequelize");
const sequelizeDB = require("../util/db");

class Todo extends Model {}

Todo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    task: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    done: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
  },
  {
    sequelize: sequelizeDB,
    timestamps: false,
    underscored: true,
    tableName: "todos",
  },
);

module.exports = Todo;
