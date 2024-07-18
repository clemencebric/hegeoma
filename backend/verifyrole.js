const verifyAdmin = (req, res, next) => {
    if (req.user.role === "admin") {
      next();
    } else {
      return res.status(403).send("You are not authorized");
    }
  };
  
  module.exports = {
    verifyAdmin
  };
  