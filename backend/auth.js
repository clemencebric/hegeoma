const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Assurez-vous que c'est le chemin correct vers votre modèle User
const secretKey = 'mysecretkey';

// Générer un token d'authentification pour un utilisateur donné
function generateAuthToken(user) {
  const payload = {
    userId: user.id,
    email: user.email, // Utilisez email ici
    // Ajoutez d'autres informations utiles à l'application
  };
  const options = {
    expiresIn: '1h', // Le token expire au bout d'une heure
  };
  return jwt.sign(payload, secretKey, options);
}

// Vérifier les informations d'identification de l'utilisateur et renvoyer un token d'authentification
function login(req, res) {
  const { email, password } = req.body; // Utilisez email ici

  // Vérifier les informations d'identification de l'utilisateur
  User.findOne({ email }, (err, user) => { // Recherchez par email
    if (err) {
        console.error('Error finding user:', err);
      return res.status(500).send({ error: 'Error finding user' });
    }
    if (!user || !user.validatePassword(password)) {
      return res.status(401).send({ error: 'Invalid email or password' });
    }

    // Générer un token d'authentification pour l'utilisateur
    const authToken = generateAuthToken(user);

    // Mettre à jour le champ authenticationToken de l'utilisateur dans la base de données
    user.authenticationToken = authToken;
    user.save((err) => {
      if (err) {
        console.error(err);
        console.error('Error saving user:', err);
        return res.status(500).send({ error: 'Error saving user' });
      }
      console.log('Token généré:', authToken);
      // Renvoyer le token dans la réponse HTTP
      res.send({ authToken }); // Assurez-vous que la clé est authToken
    });
  });
}

module.exports = {
  login,
};
