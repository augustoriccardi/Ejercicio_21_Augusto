function canEditUser(req, res, next) {
  if (req.user.role.permissions.some((p) => p.name === "edit-user")) {
    return next();
  } else {
    req.session.redirectTo = req.query.redirectTo;
    return res.send("Denegado");
  }
}

module.exports = canEditUser;
