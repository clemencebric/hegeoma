require('dotenv').config(); //utiliser .env
const db = require('./database.js');
const db_school = require('./databaseecole.js');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY; // Assurez-vous d'utiliser une clé secrète personnalisée pour signer les tokens
const bodyParser = require("body-parser");
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND, // application frontend
    methods: 'GET,POST,PUT,DELETE,INSERT,SELECT', // méthodes SQL autorisées depuis le front
    allowedHeaders: 'Content-Type,Authorization'
}));
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
  
app.post('/signup', (req, res) => {
    bcrypt.hash(req.body.password.toString(), saltRounds, (err, hash) => {
        if (err) return res.status(500).json({ error: "Error hashing password" });

        const sql = "INSERT INTO login (`email`, `password`) VALUES (?, ?)";
        const values = [req.body.email, hash];
        db.query(sql, values, (err, data) => {
            if (err) {
                console.error("Error during insertion:", err);
                return res.status(500).json({ error: "Error inserting data" });
            }
            return res.status(201).json({ success: true, message: "User created" });
        });
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Query pour récupérer l'utilisateur basé sur l'email
    const sql = `SELECT id, email, password, statut, actif FROM login WHERE email = ?`;
    
    db.query(sql, [email], (err, result) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ success: false, message: 'Server error' });
        }

        if (result.length === 0) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }

        // Comparaison du mot de passe hashé
        bcrypt.compare(password, result[0].password, (err, response) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                return res.status(500).json({ success: false, message: 'Server error' });
            }

            if (response) {
            // Génération du payload du token JWT avec les informations de l'utilisateur, y compris le statut
            const payload = {
                id: result[0].id,
                email: result[0].email,
                statut: result[0].statut,
                actif: result[0].actif
            };
                 // Génération du token JWT avec le payload et la clé secrète
            const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

                // Renvoyer le token, l'email et le statut de l'utilisateur
                return res.status(200).json({ token, email: result[0].email, statut: result[0].statut, actif: result[0].actif });
            } else {
                return res.status(401).json({ success: false, message: 'Password does not match' });
            }
        });
    });
});


app.get('/profile', verifyToken, (req, res) => {
    const sql = `SELECT * FROM login WHERE id = ${req.userId}`;
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).send('Error connecting to the database');
        }
        res.status(200).send(result);
    });
});

app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM login';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ success: false, message: 'Server error' });
        }
        res.status(200).json(results);
    });
});


/*ajouter des écoles*/
app.post('/createschool', (req, res) => {
    const sql = "INSERT INTO infoecole (`idutilisateur`, `nom`, `adresse`, `ville`, `codepostal`, `nomdomaine`, `emaileleve`) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [req.body.idutilisateur, req.body.nom, req.body.adresse, req.body.ville, req.body.codepostal, req.body.nomdomaine, req.body.emaileleve];
    db_school.query(sql, values, (err, data) => {
        if (err) {
            console.error("Error during insertion:", err);
             return res.status(500).json({ error: "Error inserting data" });
        }
        
        idecole = data.insertId;
        //console.log(idecole)
        return res.status(201).json({ success: true, message: "School created", idecole });
    });
    });

/*afficher toutes les ecoles pour l'admin*/
app.get('/school', verifyToken, (req, res) => {
    const userStatut = req.userStatut; // récupère le statut de l'utilisateur connecté à partir de l'objet request
  
    if (userStatut !== 'admin') return res.status(403).send('Access denied...');
  
    const sql = 'SELECT * FROM infoecole';
    db_school.query(sql, (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
      }
      res.status(200).json(results);
    });
  });
/*afficher seulement les ecoles de l'user*/
app.get('/userschool', (req, res) => {
    const authorizationHeader = req.headers['authorization']; // récupère la valeur de l'en-tête Authorization
  
    if (!authorizationHeader) return res.status(403).send('Access denied...');
  
    const token = authorizationHeader.split(' ')[1]; // extrait le token de l'en-tête Authorization
  
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) return res.status(401).send('Invalid token...');
  
      const userId = decoded.id; // récupère l'ID de l'utilisateur connecté à partir du token
  
      const sql = 'SELECT * FROM infoecole WHERE idutilisateur = ?';
      db_school.query(sql, [userId], (err, results) => {
        if (err) {
          console.error('Database query error:', err);
          return res.status(500).json({ success: false, message: 'Server error' });
        }
        res.status(200).json(results);
      });
    });
  });
/*afficher les informations d'une ecole en particulier */
app.get('/ecole', (req, res) => {
  const idecole = req.query.idecole;
  db_school.query('SELECT * FROM infoecole WHERE idecole = ?', [idecole], (error, results) => {
    if (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des informations sur l\'école' });
    } else {
      res.json(results);
    }
  });
});

/*creer des classes*/
  app.post('/createclass', (req, res) => {
    const { idecole, nom } = req.body;
    const sql = 'INSERT INTO classes (idecole, nom) VALUES (?, ?)';
    db_school.query(sql, [idecole, nom], (err, result) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ success: false, message: 'Server error',  });
      }
      const classe = { id: result.insertId,};
      res.status(201).json(classe);
    });
  });

  /*voir les classes*/
  app.get('/classes/:idecole', (req, res) => {
    const idecole = req.params.idecole;
    const sql = 'SELECT * FROM classes WHERE idecole = ?';
    db_school.query(sql, [idecole], (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
      }
      res.status(200).json(results);
    });
  });
    /*voir les eleves*/
    app.get('/eleves/:idecole', (req, res) => {
        const idecole = req.params.idecole;
        const sql = 'SELECT * FROM eleves WHERE idecole = ?';
        db_school.query(sql, [idecole], (err, results) => {
          if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ success: false, message: 'Server error' });
          }
          res.status(200).json(results);
        });
      });
  /*creer des eleves*/
  app.post('/createeleve', (req, res) => {
    const { idecole, idclasse, nom, prenom, classe, email, emailpun, emailpdeux } = req.body;
    //console.log(req.body)
    const sql = 'INSERT INTO eleves (idecole, idclasse, nom, prenom, classe, email, emailpun, emailpdeux) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db_school.query(sql, [idecole, idclasse, nom, prenom, classe, email, emailpun, emailpdeux], (err, result) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
      }
      const eleve = { id: result.insertId, nom, prenom, idclasse };
      res.status(201).json(eleve);
    });
  });
  app.get('/classe/:idclasse', (req, res) => {
    const { idclasse } = req.params;
    const sql = 'SELECT nom FROM classes WHERE idclasse = ?';
    db_school.query(sql, [idclasse], (err, result) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
      }
      if (result.length === 0) {
        return res.status(404).json({ success: false, message: 'Classe not found' });
      }
      const classe = result[0].nom;
      res.status(200).json({ success: true, classe });
    });
  });

  /*creer classes et liaisons profclasse*/
  app.post('/createprofesseur', async (req, res) => {
    try {
      const { idecole, nom, prenom, email, idclasses } = req.body;
      const sql = 'INSERT INTO professeurs (idecole, nom, prenom, email) VALUES (?, ?, ?, ?)';
      db_school.query(sql, [idecole, nom, prenom, email], (err, result) => {
        if (err) {
          console.error('Database query error:', err);
          return res.status(500).json({ success: false, message: 'Server error' });
        }
  
        const prof = { id: result.insertId, nom, prenom, email };
  
        // Ajouter les relations entre le professeur et les classes sélectionnées
        if (idclasses && idclasses.length > 0) {
          const sql = 'INSERT INTO profclasse (idprof, idclasse, idecole) VALUES ?';
          const values = idclasses.map((idclasse) => [result.insertId, idclasse, idecole]);
          db_school.query(sql, [values], (err, result) => {
            if (err) {
              console.error('Database query error:', err);
              return res.status(500).json({ success: false, message: 'Server error' });
            }
          });
        }
  
        res.status(201).json(prof);
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur serveur');
    }
  });
  
  /*renvoyer seulement les profs de l'ecole en cours de creation */
  app.get('/professeurs/:idecole', (req, res) => {
    const idecole = req.params.idecole;
    const sql = 'SELECT * FROM professeurs WHERE idecole = ?';
    db_school.query(sql, [idecole], (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
      }
      res.status(200).json(results);
    });
  });
  
    
/*recuperer les classes attribuees a un professeur*/
app.get('/profclasse/:idprof', async (req, res) => {
  try {
    const idprof = req.params.idprof;
    const sql = 'SELECT c.idclasse AS cidclasse, c.nom AS classe FROM classes c JOIN profclasse pc ON c.idclasse = pc.idclasse WHERE pc.idprof = ?';
    db_school.query(sql, [idprof], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Erreur serveur');
      } else {
        res.status(200).json(results);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
});
/*barre de recherche pour eleves */
app.get('/search', (req, res) => {
  const { search, idecole } = req.query;
  const query = `SELECT * FROM eleves WHERE idecole = ? AND (nom LIKE ? OR prenom LIKE ? OR classe LIKE ?)`;

  db_school.query(query, [idecole, `%${search}%`, `%${search}%`, `%${search}%`], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});
/*barre de recherche pour eleves */
app.get('/searchteachers', (req, res) => {
  const { search, idecole } = req.query;
  const query = `
    SELECT p.idprof AS id, p.nom, p.prenom, GROUP_CONCAT(c.nom SEPARATOR ', ') AS classes
    FROM professeurs p
    JOIN profclasse pc ON p.idprof = pc.idprof
    JOIN classes c ON pc.idclasse = c.idclasse
    WHERE p.idecole = ? AND (p.nom LIKE ? OR p.prenom LIKE ? OR c.nom LIKE ?)
    GROUP BY p.idprof
  `;

  db_school.query(query, [idecole, `%${search}%`, `%${search}%`, `%${search}%`], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});
app.listen(8081, () => {
    console.log("Listening on port 8081");
});
