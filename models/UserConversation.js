//Require the necessary modules
const { Model, DataTypes } = require("sequelize");

//Extend Sequelize Model to the class Messages
class UserConversation extends Model {}

//Define message model with it's attributes
UserConversation.init({
  user_conversation_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
  },
  conversation_id: {
    type: DataTypes.INTEGER,
  },
});

UserConversation.belongsTo(Users, { foreignKey: "user_id" });
Users.belongsToMany(UserConversation, { through: "user_conversations" });

//Export the Message model for use elsewhere in the application
module.exports = UserConversation;
