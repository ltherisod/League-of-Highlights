const isAdmin = (req, res, next) => {
  if (req.user.admin) {
    next()
  } else {
    return res.json({
      success: false,
      response: "You're not admin.",
      error: "You're not admin.",
    })
  }
}

module.exports = isAdmin
