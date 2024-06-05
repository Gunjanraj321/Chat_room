const { Sequelize } = require("sequelize");
const sequelize = require("../utils/dbUtils").sequelize;

const User = sequelize.define(
  "User",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timeStamps: true,
  }
);

module.exports = User;
