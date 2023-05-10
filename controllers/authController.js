const { passport } = require("../config/passport");

function login(req, res) {
  passport.authenticate("local", {
    successRedirect: "/welcome",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res);
}

module.export = { login };
