function checkAdmin(req, res, next) {
  const email = req.user?.email; // Assumes you're decoding JWT before this

  if (
    email === "dhakreayush578@gmail.com" ||
    (email && email.endsWith("@dmrc.org"))
  ) {
    return next();
  }

  return res.status(403).json({ message: "Unauthorized: Admin access only" });
}

module.exports = checkAdmin;
