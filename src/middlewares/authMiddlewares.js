const jwt = require("jsonwebtoken");

const requireLogin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.redirect("/sign-in");

  try {
   
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.redirect("/sign-in");
  }
};

module.exports = requireLogin;
