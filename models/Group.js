const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const Group = sequelize.define("Group", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  roomName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  membersNo:{
    type:DataTypes.INTEGER,
    allowNull:false       
},
});

module.exports = Group;
