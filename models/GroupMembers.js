const {DataTypes} = require('sequelize');
const sequelize = require('../utils/db');

const GroupMembers = sequelize.define('UserChatRoom',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
        },
})
module.exports = GroupMembers;