require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelizeDB = new Sequelize(process.env.DB_URL, {
  dialect: "postgres",
  logging: false,
});

module.exports = sequelizeDB;
