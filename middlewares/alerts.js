function alerts(req, res, next) {
  res.locals.alerts = req.flash();
  next();
}

module.exports = alerts;
