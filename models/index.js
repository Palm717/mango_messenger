const Conversations = require("./Conversations");
const Messages = require("./Messages");
// const UserConversation = require("./UserConversation");
const Users = require("./Users");

Conversations.belongsToMany(Users, {
  through: "UserConversation",
  foreignKey: "conversation_id",
});
Users.belongsToMany(Conversations, {
  through: "UserConversation",
  foreignKey: "user_id",
});

Conversations.hasMany(Messages, {
  foreignKey: "conversation_id",
});
Messages.belongsTo(Conversations, {
  foreignKey: "conversation_id",
});

Users.hasMany(Messages, {
  foreignKey: "user_id",
});
Messages.belongsTo(Users, {
  foreignKey: "user_id",
});

module.exports = {
  Conversations,
  Messages,
  Users,
};
