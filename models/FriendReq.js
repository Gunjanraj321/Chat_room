const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const FriendShip = sequelize.define("FriendRequest", {
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  receiverId:{
    type:DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = FriendShip;
