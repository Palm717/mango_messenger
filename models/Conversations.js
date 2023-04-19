//Require the correct Modules
const { Model, DataTypes } = requires("sequelize");

//Extend Sequelize Model to class Conversations
class Conversations extends Model {}

//Define Conversations with correct attributes
Conversations.init({
  conversation_id: {
    type: DataTypes.INT,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(50),
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Conversations;
