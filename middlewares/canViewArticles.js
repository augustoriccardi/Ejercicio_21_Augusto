function canViewArticles(req, res, next) {
  if (req.user.role.permissions.some((p) => p.name === "view-articles")) {
    return next();
  } else {
    req.session.redirectTo = req.query.redirectTo;
    return res.send("Denegado");
  }
}

module.exports = canViewArticles;
