//Require the necessary modules
const { Model, DataTypes } = require("sequelize");

//Extend Sequelize Model to the class Messages
class UserConversation extends Model {}

//Define message model with it's attributes
UserConversation.init(
  {
    user_conversation_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Users,
        key: "user_id",
      },
    },
    conversation_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Conversations,
        key: "conversation_id",
      },
    },
    messages: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Messages,
        key: "message_id",
      },
    },
  },
  {
    sequelize,
    modelName: "UserConversation",
  }
);

//Export the Message model for use elsewhere in the application
module.exports = UserConversation;
