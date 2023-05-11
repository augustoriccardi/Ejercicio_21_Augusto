/**
 * Este archivo se utiliza en un proyecto donde se está utlizando server-side
 * rendering (ej: con un motor de templates como EJS). Tiene como objetivo
 * mostrar (renderear) páginas que no están directamente relacionandas con
 * una entidad del proyecto.
 *
 * Ejemplos:
 *   - Página de inicio (Home).
 *   - Página de contacto.
 *   - Página con política de privacidad.
 *   - Página con términos y condiciones.
 *   - Página con preguntas frecuentes (FAQ).
 *   - Etc.
 *
 * En caso de estar creando una API, este controlador carece de sentido y
 * no debería existir.
 */

const { Article, User } = require("../models");

async function showHome(req, res) {
  const sessionOn = req.isAuthenticated();
  if (sessionOn) {
    const userOn = req.user.dataValues;
    try {
      const articles = await Article.findAll({
        order: [["createdAt", "DESC"]],
        include: User,
      });
      res.render("home", { articles, header: "home", sessionOn, userOn });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error de servidor");
    }
  } else {
    try {
      const articles = await Article.findAll({
        order: [["createdAt", "DESC"]],
        include: User,
      });
      res.render("home", { articles, header: "home", sessionOn });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error de servidor");
    }
  }
}

async function showContact(req, res) {
  res.render("contact");
}

async function showAboutUs(req, res) {
  res.render("aboutUs");
}

async function indexjson(req, res) {
  const article = await Article.findAll();
  res.json(article);
}
async function indexAdmin(req, res) {
  const userOn = req.user.dataValues;
  try {
    const articles = await Article.findAll({
      order: [["id", "DESC"]],
      include: User,
      where: { userId: userOn.id },
    });
    res.render("admin", { articles, userOn });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error de servidor");
  }
}

async function login(req, res) {
  const sessionOn = req.isAuthenticated();
  res.render("panel", { modal: "Login", alerts: res.locals.alerts, sessionOn });
}

module.exports = {
  showHome,
  showContact,
  showAboutUs,
  indexjson,
  indexAdmin,
  login,
};
