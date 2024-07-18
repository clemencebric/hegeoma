const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
  
    if (!authorizationHeader) return res.status(403).send('Access denied...');
  
    const token = authorizationHeader.split(' ')[1];
  
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) return res.status(401).send('Invalid token...');
  
      req.userId = decoded.id; // ajoute l'ID de l'utilisateur connecté à l'objet request
      req.userStatut = decoded.statut; // ajoute le rôle de l'utilisateur connecté à l'objet request
      //console.log(req.userStatut); //verifier le statut de l'user
      next();
    });
  };

module.exports = {
  verifyToken
};
