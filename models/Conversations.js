//Require the correct Modules
const { Model, DataTypes } = require("sequelize");

//Extend Sequelize Model to class Conversations
class Conversations extends Model {}

//Define Conversations with correct attributes
Conversations.init(
  {
    conversation_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Conversations",
  }
);

module.exports = Conversations;
