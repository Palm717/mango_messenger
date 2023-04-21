const router = require("express").Router();
const Users = require("../models/index");
const bcrypt = require("bcrypt");

//***LOGIN ROUTES */
router.post("/login", async (req, res) => {
  //user_data = {email, password}
  const user_data = req.body;
  const user = await Users.findOne({
    raw: true,
    where: {
      email: user_data.email,
    },
  });
  //Should an account with no email exist, redirects them
  if (!user) return res.redirect("/");

  //Checks if the password matches, redirects them if not
  const valid_pass = bcrypt.compareSync(user_data.password, user.password);
  if (!valid_pass) return res.redirect("/");

  //After success, store the id to session then redirect to the home dashboard
  req.session.user_id = user.id;
  res.redirect("/dashboard");
});

//***REGISTER ROUTES */
router.post("/register", async (req, res) => {
  //user_data = {username, email, password}
  const user_data = req.body;

  try {
    const user = await Users.create(user_data);

    req.session.user_id = user.id;
    res.redirect("private/dashboard");
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

module.exports = router;
