const { Article, User, Comment } = require("../models");
const formidable = require("formidable");
const fs = require("fs");

// Display a listing of the resource.
async function index(req, res) {}

// Display the specified resource.
async function show(req, res) {
  const article = await Article.findByPk(req.params.id, {
    include: [{ model: Comment }, { model: User }],
    order: [["comments", "createdAt", "DESC"]],
  });

  res.render("article", { article, header: "article" });
}

// Show the form for creating a new resource
async function create(req, res) {
  const article = await Article.findByPk(1);
  res.render("panel", { modal: "crear", article });
}

// Store a newly created resource in storage.

async function store(req, res) {
  const form = formidable({
    multiples: true,
    uploadDir: "./public/img/bd_img/",
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    try {
      if (!files.image) {
        throw new Error("No se ha seleccionado ninguna imagen");
      }

      await Article.create({
        title: fields.title,
        content: fields.content,
        image: files.image.newFilename,
        userId: req.user.id,
      });
      if (req.user.roleId === 2) {
        res.redirect("/usuarios/mis-articulos");
      } else {
        res.redirect("/panel/admin");
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
}

// Show the form for editing the specified resource.
async function edit(req, res) {
  const article = await Article.findByPk(req.params.id);
  res.render("panel", { modal: "editar", article });
}

// Update the specified resource in storage.
async function update(req, res) {
  const form = formidable({
    multiples: true,
    uploadDir: "./public/img/bd_img/",
    keepExtensions: true,
  });
  form.parse(req, async (err, fields, files) => {
    if (files.Image.size != 0) {
      await Article.update(
        {
          title: fields.title,
          content: fields.content,
          image: files.Image.newFilename,
        },
        {
          where: {
            id: req.params.id,
          },
        },
      );
    } else {
      await Article.update(
        {
          title: fields.title,
          content: fields.content,
        },
        {
          where: {
            id: req.params.id,
          },
        },
      );
      fs.unlink(`./public/img/bd_img/${files.Image.newFilename}`, (error) => {
        if (error) {
          console.error(error);
        }
      });
    }
    if (req.user.roleId < 4) {
      res.redirect("/usuarios/mis-articulos");
    } else {
      res.redirect("/panel/admin");
    }
  });
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  await Article.destroy({
    where: {
      id: req.params.id,
    },
  });
  if (!req.user.roleId) {
    res.redirect("/usuarios/mis-articulos");
  } else {
    res.redirect("/panel/admin");
  }
}

module.exports = {
  index,
  show,
  create,
  store,
  edit,
  update,
  destroy,
};
