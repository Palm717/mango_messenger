const express = require("express");
const router = express.Router();

const {
  userLogIn,
  userRegister,
  userLogOut,
} = require("../controllers/authControllers");

router.route("/login").post(userLogIn);
router.route("/register").post(userRegister);
router.route("/logout").get(userLogOut);

module.exports = router;
