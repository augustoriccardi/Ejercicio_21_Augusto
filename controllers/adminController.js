/**
 * Este archivo se puede usar como referencia para crear el controlador de
 * cualquier entidad del sistema.
 *
 * Por ejemplo, si se necesita crear un controlador para la entidad `Student`,
 * se sugiere hacer Copy & Paste de este archivo y nombrarlo como
 * `studentController.js`.
 *
 * No es necesario renombrar los métodos. A priori, la idea es que todos los
 * controladores tengan estos 7 métodos: index, show, create, store, edit,
 * update y destroy.
 *
 * Nota: en el caso de estar creando una API, los métodos `create` y `edit`
 * no serían necesarios ya que los mismos se usan en proyecto con server-side
 * rendering para mostrar los formularios de crear y editar, respectivamente.
 *
 * Por lo tanto, al crear una API, los únicos métodos que serían necesarios
 * son: index, show, store, update y destroy.
 */
const { Article, User, Comment } = require("../models");
// Display a listing of the resource.
async function index(req, res) {}

// Display the specified resource.
async function showArticles(req, res) {
  try {
    const articles = await Article.findAll({
      order: [["id", "DESC"]],
      include: User,
    });
    res.render("listaArticulos", { articles });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error de servidor");
  }
}

// Show the form for creating a new resource
async function showUsers(req, res) {
  try {
    const users = await User.findAll({
      order: [["id", "DESC"]],
      where: { role: 0 },
    });
    res.render("listaUsuarios", { users });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error de servidor");
  }
}

// Store a newly created resource in storage.
async function showComments(req, res) {
  try {
    const comments = await Comment.findAll({
      order: [["id", "DESC"]],
      include: Article,
    });
    res.render("listaComentarios", { comments });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error de servidor");
  }
}

// Show the form for editing the specified resource.
async function editUser(req, res) {}

// Update the specified resource in storage.
async function updateUser(req, res) {
  let passHashed = await bcrypt.hash(req.body.password, 8);
  const user = await User.findByPk(req.user.id);
  if (req.body.password === "") {
    user.update({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.user.password,
    });
  } else {
    user.update({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: passHashed,
    });
  }
  return res.redirect("/");
}

// Remove the specified resource from storage.
async function destroyUser(req, res) {}

async function createComment(req, res) {
  return res.render("Panel", { modal: "CrarComentario" });
}

// Show the form for editing the specified resource.
async function editComment(req, res) {
  const comment = await Comment.findByPk(req.params.id, { include: [{ model: Article }] });
  res.render("Panel", { modal: "EditarComentario", comment });
}

// Update the specified resource in storage.
async function updateComment(req, res) {}

// Remove the specified resource from storage.
async function destroyComment(req, res) {}

module.exports = {
  index,
  showArticles,
  showUsers,
  showComments,
  editUser,
  updateUser,
  destroyUser,
  createComment,
  editComment,
  updateComment,
  destroyComment,
};
