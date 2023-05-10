const { passport, passportConfig } = require("./config/passport");
require("dotenv").config();
const session = require("express-session");
const express = require("express");
const routes = require("./routes");
const methodOverride = require("method-override");
const APP_PORT = process.env.APP_PORT || 3000;
const app = express();
const alertMiddleware = require("./middlewares/alerts.js");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");

app.use(
  session({
    secret: "AlgúnTextoSuperSecreto",
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.session());
passportConfig();
app.use(cookieParser());
app.use(flash());
app.use(alertMiddleware);

app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

routes(app);

// router.get("/registro")
// router.post("/registro")
// router.get("/logout")

app.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${APP_PORT}.\n`);
});
