const { Model, DataTypes } = require("sequelize");

class Messages extends Model {}

Messages.init(
  {
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
      allowNull: false,
      references: {
        model: "users",
        key: "user_id",
      },
    },
    message: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: db,
    modelName: "Messages",
  }
);

Conversations.hasMany(Messages, { foreignKey: "conversation_id" });
Messages.belongsTo(Conversations, { foreignKey: "conversation_id" });

module.exports = Messages;
