const router = require("express").Router();
const { Users, Messages, Conversations } = require("../models/index");

//*** RENDERS HOME LOGIN PAGE */
router.get("/", async (req, res) => {
  res.render("index");
});

//*** CHECKS IF USER IS AUTHENTICATED */
function isAuthenticated(req, res, next) {
  if (!req.session.user_id) {
    return res.redirect("/");
  }
  next();
}

//*** IF AUTHENTICATED, RENDER DASHBOARD */
router.get("/dashboard", isAuthenticated, async (req, res) => {
  try {
    const conversations = await Conversations.findAll({
      where: {
        users: req.session.user_id,
      },
      raw: true,
    });
    const userBase = await Users.findAll();
    const user = await Users.findByPk(req.session.user_id);
    res.render("/dashboard", {
      username: user.username,
      conversations: conversations,
      userBase: userBase,
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/private", async (req, res) => {
  res.render("private");
});

module.exports = router;
