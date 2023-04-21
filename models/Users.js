//require the correct modules
const { Model, DataTypes } = require("sequelize");
const db = require("../config/connection");

//extend sequelize model on class Users
class Users extends Model {}
//Init Users and ttheir attributes
Users.init(
  {
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
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: db,
    modelName: "Users",
    hooks: {
      // Do something right before the user is stored to the table
      async beforeCreate(Users) {
        //bcrypt will return an encrypted string mixing the standard password string with 10 levels of salt
        const encrypted_pass = await bcrypt.hash(Users.password, 10);
        //Store the encrypted password to the database instead of the standard string
        Users.pass = encrypted_pass;
      },
    },
  }
);

//export the Users Model to other parts of the application
module.exports = Users;
