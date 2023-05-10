require("dotenv").config();
const alertMiddleware = require("./middlewares/alerts.js");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const { Article, User, Comment } = require("./models");
const bcrypt = require("bcryptjs");
const flash = require("express-flash");
const sequelize = require("sequelize");
const cookieParser = require("cookie-parser");

const express = require("express");
const routes = require("./routes");
const methodOverride = require("method-override");
const { id } = require("date-fns/locale");
const APP_PORT = process.env.APP_PORT || 3000;
const app = express();

app.use(
  session({
    secret: "AlgúnTextoSuperSecreto",
    resave: false, // Docs: "The default value is true, but using the default has been deprecated".
    saveUninitialized: false, // Docs: "The default value is true, but using the default has been deprecated".
  }),
);
app.use(passport.session());
app.use(cookieParser());
app.use(flash());
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

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
      return done(error);
    }
    // Aquí adentro es necesario validar (contra nuestra base de datos)
    // que username y password sean correctos.
    // Ver la documentación de Passport por detalles.
  }),
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

app.use(alertMiddleware);

routes(app);

app.get("/login", async function (req, res) {
  res.render("panel", { modal: "Login", alerts: res.locals.alerts });
});

app.get("/welcome", function (req, res) {
  if (req.isAuthenticated()) {
    res.send(`Te damos la bienvenida, ${req.user.firstname}!!`);
  } else {
    res.redirect("/login");
  }
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/welcome",
    failureRedirect: "/login",
    failureFlash: true,
  }),
);

// router.get("/registro")
// router.post("/registro")
// router.get("/login")
// router.post("/login")
// router.get("/logout")

app.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${APP_PORT}.\n`);
});
