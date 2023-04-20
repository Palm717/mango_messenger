const router = require("express").Router();
const {
  Users,
  UserConversations,
  Messages,
  Conversations,
} = require("../models/index");

router.get("/", async (req, res) => {
  res.render("index");
});

router.get("/dashboard", async (req, res) => {
  res.render("dashboard");
});

router.get("/private", async (req, res) => {
  res.render("private");
});

module.exports = router;
