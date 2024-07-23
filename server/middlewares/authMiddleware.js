const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("auth/login");
      } else {
        next();
      }
    });
  } else {
    res.redirect("auth/login");
  }
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_ACCESS_SECRET, async (err, decodedToken) => {
      if (!err) {
        req.user = decodedToken?.id;
      }
    });
  }
  next();
};

module.exports = { requireAuth, checkUser };