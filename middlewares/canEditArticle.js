function canEditArticle(req, res, next) {
  if (req.user.role.permissions.some((p) => p.name === "edit-article")) {
    return next();
  } else {
    req.session.redirectTo = req.query.redirectTo;
    return res.send("Denegado");
  }
}

module.exports = canEditArticle;
