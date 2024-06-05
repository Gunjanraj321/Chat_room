const mysql = require('mysql2');
const Sequelize = require("sequelize");
require('dotenv').config(); 

const sequelize = new Sequelize(
  process.env.database,
  process.env.user,
  process.env.password,
  {
    host: process.env.host,
    dialect: "mysql",
    logging: false,
  }
);

module.exports = { sequelize };
