const FriendShip = require("./FriendReq");
const Group = require("./Group");
const GroupMembers = require("./GroupMembers");
const User = require("./user");

// Database relations
User.belongsToMany(Group, {through: GroupMembers });
Group.belongsToMany(User, {through: GroupMembers });

Group.belongsTo(User, {
    foreignKey: "AdminId",
    constraints: true,
    onDelete: "CASCADE",
  });

FriendShip.belongsTo(User, { foreignKey: 'senderId'});
User.hasMany(FriendShip, {foreignKey: 'senderId'})

module.exports = {
    FriendShip,
    Group,
    User,
    
};