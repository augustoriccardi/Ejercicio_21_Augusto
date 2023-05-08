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
  try {
    const articles = await Article.findAll({
      order: [["createdAt", "DESC"]],
      limit: 4,
      include: User,
    });
    res.render("home", { articles, header: "home" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error de servidor");
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
  try {
    const articles = await Article.findAll({
      order: [["id", "DESC"]],
      include: User,
    });
    console.log(articles.User);
    res.render("admin.ejs", { articles });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error de servidor");
  }
}

module.exports = {
  showHome,
  showContact,
  showAboutUs,
  indexjson,
  indexAdmin,
};
