const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");
const { User, Role, Permission } = require("../models");

function passportConfig() {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
      try {
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
          return done(null, false, { message: "Credenciales incorrectas, revise su email" });
        } else if (!(await bcrypt.compare(password, user.password))) {
          return done(null, false, { message: "Credenciales incorrectas, revise su contraseña" });
        } else {
          return done(null, user);
        }
      } catch (error) {
        console.log(error);
        return done(null, false, { message: "Ocurrió un error inesperado, por favor reintente" });
      }
    }),
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async function (id, done) {
    try {
      const user = await User.findByPk(id, { include: { model: Role, include: Permission } });
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
}

module.exports = { passport, passportConfig };
