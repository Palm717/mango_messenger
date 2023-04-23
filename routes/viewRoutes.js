const express = require("express");
const router = express.Router();

const {
  checkAuthenticationLogin,
  renderAuthenticationPage,
  isAuthenticated,
} = require("../controllers/viewControllers");

router.route("/").get(checkAuthenticationLogin, isAuthenticated);
router.route("/dashboard").get(renderAuthenticationPage);

module.exports = router;
