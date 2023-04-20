const Conversations = require("./Conversations");
const Messages = require("./Messages");
const UserConversations = require("./UserConversation");
const Users = require("./Users");

//Users have many Messages
Users.hasMany(Messages, {
  foreignKey: "user_id",
});

UserConversation.belongsTo(Users, {
  foreignKey: "user_id",
});

Users.belongsToMany(UserConversation, {
  foreignKey: "user_id",
});

UserConversations.hasMany(Messages, {
  foreignKey: "message_id",
});

module.exports = {
  Conversations,
  Messages,
  UserConversations,
  Users,
};
