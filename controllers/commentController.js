const { Comment, Article, User } = require("../models");

// Display a listing of the resource.
async function index(req, res) {}

// Display the specified resource.
// Display the specified resource.
async function show(req, res) {
  const article = await Article.findByPk(req.params.id, {
    include: [{ model: Comment }, { model: User }],
    order: [["createdAt", "DESC"]],
  });

  res.render("article", { article, header: "article" });
}

// Show the form for creating a new resource
async function create(req, res) {
  await Comment.create({
    name: req.user.firstname + " " + req.user.lastname,
    content: req.body.comment,
    articleId: req.params.id,
  });

  res.redirect(`/articulos/${req.params.id}`);
}
// Store a newly created resource in storage.
async function store(req, res) {}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {
  await Comment.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.redirect("/panel/bd-comments");
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
