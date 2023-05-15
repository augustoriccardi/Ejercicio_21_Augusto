function canEditComment(req, res, next) {
  if (req.user.role.permissions.some((p) => p.name === "edit-comment")) {
    return next();
  } else {
    req.session.redirectTo = req.query.redirectTo;
    return res.send("Denegado");
  }
}

module.exports = canEditComment;
