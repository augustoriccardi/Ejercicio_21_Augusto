function ensureAdmin(req, res, next) {
  if (req.user.roleId === 4) {
    return next();
  } else {
    req.session.redirectTo = req.query.redirectTo;
    return res.send("Denegado");
  }
}

module.exports = ensureAdmin;
