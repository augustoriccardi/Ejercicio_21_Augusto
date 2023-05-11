const { User, sequelize } = require("../models");
const bcrypt = require("bcryptjs");

// Display a listing of the resource.
async function index(req, res) {}

// Display the specified resource.
async function show(req, res) {}

// Show the form for creating a new resource
async function create(req, res) {
  const sessionOn = req.isAuthenticated();
  return res.render("panel", { modal: "Registro", sessionOn });
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
  const sessionOn = req.isAuthenticated();
  const userOn = req.user.dataValues;
  return res.render("Panel", { modal: "EditarUsuario", sessionOn, userOn });
}

async function update(req, res) {
  let passHashed = await bcrypt.hash(req.body.password, 8);
  const user = await User.findByPk(req.user.id);
  user.update({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: passHashed,
  });
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
  show,
  create,
  store,
  edit,
  update,
  destroy,
  logout,
};
