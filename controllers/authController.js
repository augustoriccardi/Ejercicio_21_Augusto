const passport = require("passport");

function login(req, res) {
  return passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res);
}

module.exports = { login };
