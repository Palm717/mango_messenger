//require the correct modules
const { Model, DataTypes } = require("sequelize");

//extend sequelize model on class Users
class Users extends Model {}
//Init Users and ttheir attributes
Users.init({
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(50),
  },
  email: {
    type: DataTypes.STRING(50),
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

//export the Users Model to other parts of the application
module.exports = Users;
