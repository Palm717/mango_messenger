const express = require("express");
const router = require("express").Router();
const { Users, Messages, Conversations } = require("../models/index");

//*** RENDERS HOME LOGIN PAGE */
const checkAuthenticationLogin = async (req, res) => {
  res.render("index");
};

//*** CHECKS IF USER IS AUTHENTICATED */
function isAuthenticated(req, res, next) {
  console.log(req.session);
  if (!req.session.user_id) {
    return res.redirect("/");
  }
  next();
}

//*** IF AUTHENTICATED, RENDER DASHBOARD */
const renderAuthenticationPage = async (req, res) => {
  try {
    const conversations = await Conversations.findAll({
      // where: {
      //   users: req.session.user_id,
      // },
      raw: true,
    });
    const userBase = await Users.findAll({
      raw: true,
    });
    const user = await Users.findByPk(req.session.user_id);
    // const conversation = await Conversations.findByPk(conversationId, {
    //   include: ['messages'],
    // });

    res.render("private/dashboard", {
      username: user.username,
      conversations,
      userBase,
      // conversation,
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  checkAuthenticationLogin,
  renderAuthenticationPage,
  isAuthenticated,
};

/* we aren't referring to Messages anywhere on in this file,
possibly do not need to deconstruct it's class here */
