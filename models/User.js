const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  availCoins: {
    type: DataTypes.INTEGER,
    defaultValue: 1000,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isPrimeMember: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  imgUrl:{
    type: DataTypes.STRING,
    defaultValue:null,
  },
  about:{
    type:DataTypes.STRING,
    defaultValue:'Hey there I am using chathub',
  },
});


module.exports = User;
