const { Model, DataTypes } = require("sequelize");

class Messages extends Model {}

Messages.init({
  message_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  conversation_id: {
    type: DataTypes.INTEGER,
  },
  user_id: {
    type: DataTypes.INTEGER,
  },
  message: {
    type: DataTypes.STRING(255),
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

Conversations.hasMany(Messages, { foreignKey: "conversation_id" });
Messages.belongs(Conversations, { foreignKey: "conversation_id" });

module.exports = Messages;
