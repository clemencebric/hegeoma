const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(403).send("You are not authorized");
  }

  const [Bearer, token] = authHeader.split(" ");
  if (!token || Bearer !== "Bearer") {
    return res.status(403).send("Invalid Token");
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).send("Token is not valid");
    }
    req.user = user;
    next();
  });
};

module.exports = {
  verifyToken
};
