const express = require("express");
const expbs = require("express-handlebars");
const sequelize = require("sequelize");
const PORT = process.env.PORT || 3001;

const app = express();

app.engine("handlebars", expbs());
app.set("view engine", "handlebars");

app.use(3001, () => {
  console.log("App listening on", 3001);
});
