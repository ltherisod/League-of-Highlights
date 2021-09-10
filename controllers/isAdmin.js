const isAdmin = (req, res, next) => {
  if (req.user.admin) {
    next()
  } else {
    return res.json({ response: false })
  }
}

module.exports = isAdmin
