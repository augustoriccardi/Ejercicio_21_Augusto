function ensureEditor(req, res, next) {
  if (req.user.roleId >= 3) {
    return next();
  } else {
    req.session.redirectTo = req.query.redirectTo;
    return res.send("Denegado");
  }
}

module.exports = ensureEditor;
