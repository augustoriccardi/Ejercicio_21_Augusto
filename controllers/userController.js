const { Article, User } = require("../models");
const bcrypt = require("bcryptjs");

// Display a listing of the resource.
async function index(req, res) {}

// Display the specified resource.
async function showMyArticles(req, res) {
  try {
    const articles = await Article.findAll({
      order: [["id", "DESC"]],
      where: { userId: req.user.id },
    });
    res.render("listaArticulos", { articles });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error de servidor");
  }
}

// Show the form for creating a new resource
async function create(req, res) {
  return res.render("panel", { modal: "Registro" });
}

// Store a newly created resource in storage.
async function store(req, res) {
  let passHashed = await bcrypt.hash(req.body.password, 8);
  await User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: passHashed,
    email: req.body.email,
  });
  return res.redirect("/");
}

// Show the form for editing the specified resource.
async function edit(req, res) {
  return res.render("Panel", { modal: "EditarUsuario" });
}

async function update(req, res) {
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
async function destroy(req, res) {}

async function logout(req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    return res.redirect("/");
  });
}

module.exports = {
  index,
  showMyArticles,
  create,
  store,
  edit,
  update,
  destroy,
  logout,
};
