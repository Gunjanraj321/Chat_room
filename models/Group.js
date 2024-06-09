const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const ChatRoom = sequelize.define("ChatRoom", {
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

module.exports = ChatRoom;