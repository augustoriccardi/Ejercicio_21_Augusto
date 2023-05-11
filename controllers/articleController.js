const { Article, User, Comment } = require("../models");
const formidable = require("formidable");
const fs = require("fs");

async function index(req, res) {
  const articles = await Article.findAll({
    where: {
      userId: [2, 3, 4, 5],
    },
    include: {
      model: User,
      attributes: ["id", "firstname", "lastname"],
    },
  });
  res.render("home", { articles });
}
// Display the specified resource.
async function show(req, res) {
  const sessionOn = req.isAuthenticated();
  if (sessionOn) {
    const userOn = req.user.dataValues;
    const id = req.params.id;
    const article = await Article.findByPk(id, {
      include: [{ model: Comment }, { model: User }],
      order: [["comments", "createdAt", "DESC"]],
    });

    res.render("article", { article, header: "article", sessionOn, userOn });
  } else {
    const id = req.params.id;
    const article = await Article.findByPk(id, {
      include: [{ model: Comment }, { model: User }],
      order: [["comments", "createdAt", "DESC"]],
    });

    res.render("article", { article, header: "article", sessionOn });
  }
}

// Show the form for creating a new resource
async function create(req, res) {
  const userOn = req.user.dataValues;
  const sessionOn = req.isAuthenticated();
  const article = await Article.findByPk(1);
  res.render("panel", { modal: "crear", article, sessionOn, userOn });
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

      res.redirect("/admin");
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
}

// Show the form for editing the specified resource.
async function edit(req, res) {
  const userOn = req.user.dataValues;
  const sessionOn = req.isAuthenticated();
  const article = await Article.findByPk(req.params.id);
  res.render("panel", { modal: "editar", article, sessionOn, userOn });
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
    res.redirect(`/admin`);
  });
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  await Article.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.redirect(`/admin`);
}

// Otros handlers...
// ...

module.exports = {
  index,
  show,
  create,
  store,
  edit,
  update,
  destroy,
};
