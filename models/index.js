const FriendShip = require("./FriendReq");
const Group = require("./Group");
const GroupMembers = require("./GroupMembers");
const User = require("./user");

// Database relations
User.belongsTo(Group, { GroupMembers });
Group.hasMany(User, { GroupMembers });

FriendShip.belongsTo(User, { foreignKey: 'senderId'});
User.hasMany(FriendShip, {foreignKey: 'senderId'})

module.exports = {
    FriendShip,
    Group,
    User,
    
};