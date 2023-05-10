function alerts(req, res , next) {
    res.locals.alerts = req.flash()
    console.log(res.locals)
    next()
}


module.exports = alerts