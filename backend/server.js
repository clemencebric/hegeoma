require('dotenv').config(); //utiliser .env
const db = require('./database.js');
const db_school = require('./databaseecole.js');
const db_org = require('./databaseorganisme.js');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY; // clé secrète personnalisée pour signer les tokens
const bodyParser = require("body-parser");
const express = require('express');
const XLSX = require('xlsx'); //pour excel
const path = require('path'); //pour excel
const fs = require('fs');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const nodemailer = require('nodemailer'); //pour mails
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

        const sql = "INSERT INTO login (`email`, `password`, `nature`, `statut`) VALUES (?, ?, ?, ?)";
        const values = [req.body.email, hash, req.body.role, req.body.statut];
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
    const sql = `SELECT id, email, password, nature, statut, actif FROM login WHERE email = ?`;
    
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
                nature: result[0].nature, 
                actif: result[0].actif
            };
                 // Génération du token JWT avec le payload et la clé secrète
            const token = jwt.sign(payload, secretKey, { expiresIn: '1h' }); //a modifier pour changer la duree de validite de la session

                // Renvoyer le token, l'email et le statut de l'utilisateur
                return res.status(200).json({ token, email: result[0].email, statut: result[0].statut, nature: result[0].nature, actif: result[0].actif });
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
/*recuperer toutes les infos des personnes connectees*/
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
/*recuperer les donnees dun untilisateur en particulier */
app.get('/adminuser/:id', (req, res) => {
  const userId = req.params.id;
  console.log(req.params.id)
  const sql = 'SELECT * FROM login WHERE id = ?';
  db.query(sql, [userId], (err, result) => {
      if (err) {
          console.error('Database query error:', err);
          return res.status(500).json({ success: false, message: 'Server error' });
      }

      if (result.length === 0) {
          return res.status(404).json({ success: false, message: 'User not found' });
      }

      res.status(200).json({ success: true, data: result[0] });
  });
});

/*ajouter des écoles*//*
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
    });*/
    app.post('/createschool', (req, res) => {
      const { idutilisateur, nom, adresse, ville, codepostal, nomdomaine, emaileleve, appareils } = req.body;
    
      // Insert school into the database
      const insertSchoolQuery = "INSERT INTO infoecole (idutilisateur, nom, adresse, ville, codepostal, nomdomaine, emaileleve) VALUES (?, ?, ?, ?, ?, ?, ?)";
      db_school.query(insertSchoolQuery, [idutilisateur, nom, adresse, ville, codepostal, nomdomaine, emaileleve], (err, result) => {
        if (err) {
          console.error('Error inserting school:', err);
          return res.status(500).json({ error: "Error inserting school" });
        }
        const idecole = result.insertId;
    
        // Insert appareils into the database
        if (appareils && appareils.length > 0) {
          const insertAppareilsQuery = "INSERT INTO appareils (idecole, nom) VALUES ?";
          const values = appareils.map((appareil) => [idecole, appareil]);
          db_school.query(insertAppareilsQuery, [values], (err, result) => {
            if (err) {
              console.error('Error inserting appareils:', err);
              return res.status(500).json({ error: "Error inserting appareils" });
            }
          });
        }
    
        res.status(201).json({ idecole });
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
/*afficher toutes les entreprises pour l'admin*/
app.get('/listentreprises', verifyToken, (req, res) => {
  const userStatut = req.userStatut; // récupère le statut de l'utilisateur connecté à partir de l'objet request

  if (userStatut !== 'admin') return res.status(403).send('Access denied...');

  const sql = 'SELECT * FROM organisme';
  db_org.query(sql, (err, results) => {
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


//generer addresse email
const generateEmail = (prenom, nom, format, domaine) => {
  if (format === "prenom.nom@domaine") {
      return `${prenom.toLowerCase()}.${nom.toLowerCase()}${domaine}`;
  } else if (format === "initiale.nom@domaine") {
      return `${prenom.charAt(0).toLowerCase()}.${nom.toLowerCase()}${domaine}`;
  }
  return null;
};

// creer des eleves avec leurs emails
app.post('/createeleve', (req, res) => {
  const { idecole, idclasse, nom, prenom, classe, emailpun, emailpdeux } = req.body;
  
  // chercher le domaine et le format de l'email
  const fetchDomainAndFormatQuery = "SELECT nomdomaine, emaileleve FROM infoecole WHERE idecole = ?";
  db_school.query(fetchDomainAndFormatQuery, [idecole], (err, result) => {
      if (err) {
          console.error('Error fetching domain and email format:', err);
          return res.status(500).json({ error: "Error fetching domain and email format" });
      }

      const { nomdomaine: domaine, emaileleve: format } = result[0];
      const email = generateEmail(prenom, nom, format, domaine);
     
      // inserer l'eleve dans la table eleves
      const insertEleveQuery = "INSERT INTO eleves (idecole, idclasse, nom, prenom, classe, email, emailpun, emailpdeux) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
      db_school.query(insertEleveQuery, [idecole, idclasse, nom, prenom, classe, email, emailpun, emailpdeux], (err, result) => {
          if (err) {
              console.error('Error inserting eleve:', err);
              return res.status(500).json({ error: "Error inserting eleve" });
          }
          res.status(201).json({ ideleve: result.insertId, nom, prenom, email, classe });
      });
  });
});
/*supprimer des eleves */
  app.delete('/eleve/:ideleve', (req, res) => {
    const { ideleve } = req.params;
  
    const sql = 'DELETE FROM eleves WHERE ideleve = ?'; 
    db_school.query(sql, [ideleve], (err, result) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'Élève non trouvé' });
      }
  
      res.status(200).json({ success: true, message: 'Élève supprimé avec succès' });
    });
  });
/*afficher classes */
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
/*supprimer classes */ 
app.delete('/deleteclass/:id', (req, res) => {
  const { id } = req.params;
  const updateSql = 'UPDATE eleves SET idclasse = NULL, classe = NULL WHERE idclasse = ?'; // Mettre à jour les élèves qui sont dans la classe à supprimer
  const updateprofclasseSql = 'DELETE FROM profclasse WHERE idclasse = ?'; // Supprimer la classe
  const deleteSql = 'DELETE FROM classes WHERE idclasse = ?'; // Supprimer la classe

  db_school.query(updateSql, [id], (err, result) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
    db_school.query(updateprofclasseSql, [id], (err, result) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
      }
    db_school.query(deleteSql, [id], (err, result) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
      }

      res.status(200).json({ success: true, message: 'Classe supprimée avec succès' });
    });
  }); 
});
});
/*modifier la classe d'un eleve*/
app.post('/updateeleve/:id', async (req, res) => {
  const { id } = req.params; // Récupérer l'ID de l'élève à partir des paramètres de la requête
  const { idclasse } = req.body; // Récupérer l'ID de la nouvelle classe à partir du corps de la requête

  //console.log("ideleve:", id, "idclasse:", idclasse);

  try {
    // Vérifiez que la nouvelle classe existe et récupérez le nom de la classe
    const getClassSql = 'SELECT idecole, nom FROM classes WHERE idclasse = ?';
    db_school.query(getClassSql, [idclasse], (err, result) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ message: 'Server error' });
      }

      if (result.length === 0) {
        return res.status(400).json({ message: 'La classe sélectionnée n\'existe pas' });
      }

      const classe = result[0];
     // console.log(classe.nom); // classe
      const updateSql = 'UPDATE eleves SET idclasse = ?, classe = ? WHERE ideleve = ?';
      db_school.query(updateSql, [idclasse, classe.nom, id], (updateErr, updateResult) => {
        if (updateErr) {
          console.error('Database query error:', updateErr);
          return res.status(500).json({ message: 'Erreur lors de la mise à jour de la classe de l\'élève' });
        }
        res.status(200).json({ message: 'La classe de l\'élève a été mise à jour avec succès' });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la classe de l\'élève' });
  }
});



  /*creer classes et liaisons profclasse avec emails*/
  app.post('/createprofesseur', (req, res) => {
    const { idecole, nom, prenom, idclasses } = req.body;
    
    // Fetch the domain and email format from the database
    const fetchDomainAndFormatQuery = "SELECT nomdomaine, emaileleve FROM infoecole WHERE idecole = ?";
    db_school.query(fetchDomainAndFormatQuery, [idecole], (err, result) => {
        if (err) {
            console.error('Error fetching domain and email format:', err);
            return res.status(500).json({ error: "Error fetching domain and email format" });
        }
  
        const { nomdomaine: domaine, emaileleve: format } = result[0];
        const email = generateEmail(prenom, nom, format, domaine);
       
        // Insert the professeur into the database
        const insertProfesseurQuery = "INSERT INTO professeurs (idecole, nom, prenom, email) VALUES (?, ?, ?, ?)";
        db_school.query(insertProfesseurQuery, [idecole, nom, prenom, email], (err, result) => {
            if (err) {
                console.error('Error inserting professeur:', err);
                return res.status(500).json({ error: "Error inserting professeur" });
            }
            const profId = result.insertId;
  
            // Add the relations between the professeur and the selected classes
            if (idclasses && idclasses.length > 0) {
                const insertProfClasseQuery = 'INSERT INTO profclasse (idprof, idclasse, idecole) VALUES ?';
                const values = idclasses.map((idclasse) => [profId, idclasse, idecole]);
                db_school.query(insertProfClasseQuery, [values], (err, result) => {
                    if (err) {
                        console.error('Error inserting profclasse:', err);
                        return res.status(500).json({ error: "Error inserting profclasse" });
                    }
                });
            }
  
            res.status(201).json({ idprof: profId, nom, prenom, email });
        });
    });
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
 /*supprimer un professeur et ses classes attribuees*/
 app.delete('/deleteprofesseur/:idprof', async (req, res) => {
  const idprof = req.params.idprof;
  
  try {
    // Commencer une transaction pour garantir l'intégrité des données
    await new Promise((resolve, reject) => {
      db_school.beginTransaction((err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    // Supprimer les associations du professeur avec les classes
    await new Promise((resolve, reject) => {
      const sqlDeleteProfClasse = 'DELETE FROM profclasse WHERE idprof = ?';
      db_school.query(sqlDeleteProfClasse, [idprof], (err, result) => {
        if (err) {
          db_school.rollback(() => reject(err));
        } else {
          resolve();
        }
      });
    });

    // Supprimer le professeur
    await new Promise((resolve, reject) => {
      const sqlDeleteProfesseur = 'DELETE FROM professeurs WHERE idprof = ?';
      db_school.query(sqlDeleteProfesseur, [idprof], (err, result) => {
        if (err) {
          db_school.rollback(() => reject(err));
        } else {
          db_school.commit((err) => {
            if (err) {
              db_school.rollback(() => reject(err));
            } else {
              resolve();
            }
          });
        }
      });
    });

    // Envoyer une réponse de succès
    res.status(200).json({ success: true, message: 'Professeur supprimé avec succès' });
  } catch (error) {
    // En cas d'erreur, faire un rollback de la transaction
    console.error('Database error:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
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
/*barre de recherche pour profs */
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
/*barre de recherche pour ecoles */
app.get('/searchecoles', (req, res) => {
  const { search } = req.query;
  const query = `SELECT * FROM infoecole WHERE (nom LIKE ? OR adresse LIKE ? OR nomdomaine LIKE ?)`;

  db_school.query(query, [`%${search}%`, `%${search}%`, `%${search}%`], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(results);
  });
});

/*barre de recherche pour entreprises */
app.get('/searchentreprises', (req, res) => {
  const { search = '' } = req.query; // Valeur par défaut pour la recherche
  const query = `SELECT * FROM organisme WHERE (nom LIKE ? OR adresse LIKE ? OR ville LIKE ?)`;

  db_org.query(query, [`%${search}%`, `%${search}%`, `%${search}%`], (err, results) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json(results);
  });
});



/*supprimer des écoles*/
app.delete('/schools/:id', async (req, res) => {
  try {
    const schoolId = req.params.id;
    //console.log(req);
    // Supprimez toutes les classes associées à l'école
    await db_school.query('DELETE FROM profclasse WHERE idecole = ?', [schoolId]);

    // Supprimez toutes les classes associées à l'école
    await db_school.query('DELETE FROM classes WHERE idecole = ?', [schoolId]);

    // Supprimez tous les élèves associés à l'école
    await db_school.query('DELETE FROM eleves WHERE idecole = ?', [schoolId]);

    // Supprimez tous les profs associés à l'école
    await db_school.query('DELETE FROM professeurs WHERE idecole = ?', [schoolId]);

    // Supprimez l'école
    await db_school.query('DELETE FROM infoecole WHERE idecole = ?', [schoolId]);

    res.status(200).json({ message: 'École supprimée avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'école' });
  }
});
/*ajouter des app pour les ecoles*/

app.post('/createappshcool', (req, res) => {
  const { idecole, nomapp } = req.body;
  const sql = 'INSERT INTO applications (idecole, nomapp) VALUES (?, ?)';
  db_school.query(sql, [idecole, nomapp], (err, result) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
    const appecole = { idapp: result.insertId, nomapp };
    res.status(201).json(appecole);
  });
});

/*afficher les app pour ecole creees*/
app.get('/getapps/:idecole', (req, res) => {
  const idecole = req.params.idecole;
  const sql = 'SELECT * FROM applications WHERE idecole = ?';
  db_school.query(sql, [idecole], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
    res.status(200).json(results);
  });
});
/*supprimer une app pour ecole*/
app.delete('/deleteapp/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM applications WHERE idapp = ?';
  db_school.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
    res.status(200).json({ success: true, message: 'Application deleted' });
  });
});
/*creer un organisme*/
app.post('/createorg', (req, res) => {
  const { idutilisateur, nom, adresse, ville, codepostal, fournisseur, appareils = [], jamfs = [], appli, restriction } = req.body;

  const sqlInsertOrganisme = 'INSERT INTO organisme (idutilisateur, nom, adresse, ville, codepostal, fournisseur, restrictions) VALUES (? ,? , ?, ?, ?, ?, ?)';
  db_org.query(sqlInsertOrganisme, [idutilisateur, nom, adresse, ville, codepostal, fournisseur, restriction], (err, result) => {
    if (err) {
      console.error('Database query error for organisme:', err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
    const idOrganisme = result.insertId;


    // Insérer les appareils
    const sqlInsertAppareil = 'INSERT INTO appareils (nom, idorg) VALUES (?, ?)';
    const appareilPromises = appareils.map(appareil => {
      return new Promise((resolve, reject) => {
        db_org.query(sqlInsertAppareil, [appareil, idOrganisme], (err) => {
          if (err) {
            console.error(`Database query error for appareil (${appareil}):`, err);
            return reject(err);
          }
          resolve();
        });
      });
    });

    Promise.all(appareilPromises)
      .then(() => {
        // Insérer les services Jamf
        const sqlInsertJamfs = 'INSERT INTO jamf (nom, idorg) VALUES (?, ?)';
        const jamfsPromises = jamfs.map(jamfsService => {
          return new Promise((resolve, reject) => {
            db_org.query(sqlInsertJamfs, [jamfsService, idOrganisme], (err) => {
              if (err) {
                console.error(`Database query error for jamf (${jamfsService}):`, err);
                return reject(err);
              }
              resolve();
            });
          });
        });

        return Promise.all(jamfsPromises);
      })
      .then(() => {
        // Insérer les applications
        const sqlInsertAppli = 'INSERT INTO application (nom, idorg) VALUES (?, ?)';
        const applicationPromises = appli.map(application => {
          return new Promise((resolve, reject) => {
            db_org.query(sqlInsertAppli, [application, idOrganisme], (err) => {
              if (err) {
                console.error(`Database query error for application (${application}):`, err);
                return reject(err);
              }
              resolve();
            });
          });
        });

        return Promise.all(applicationPromises);
      })
      .then(() => {
        res.status(201).json({ success: true, idOrganisme });
      })
      .catch((err) => {
        console.error('Database query error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
      });
  });
});

/*afficher un organisme*/
app.get('/organismes/:idutilisateur', (req, res) => {
  const idutilisateur = req.params.idutilisateur;

  const sql = 'SELECT idorg, nom, adresse, codepostal FROM organisme WHERE idutilisateur = ?';
  db_org.query(sql, [idutilisateur], (err, result) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
    /*
    if (result.length === 0) {
      console.log('No organismes found for user:', idutilisateur);
    } else {
      console.log('Organismes found:', result);
    }*/
    res.status(200).json(result);
  });
});

/*afficher le reste des informations sur l'organisme */
app.get('/organisme/:idorg', (req, res) => {
  const idorg = req.params.idorg;

  const sqlOrganisme = 'SELECT nom, adresse, codepostal, fournisseur, restrictions FROM organisme WHERE idorg = ?';
  const sqlAppareils = 'SELECT nom FROM appareils WHERE idorg = ?';
  const sqlJamf = 'SELECT nom FROM jamf WHERE idorg = ?';
  const sqlAppli = 'SELECT nom FROM application WHERE idorg = ?';

  db_org.query(sqlOrganisme, [idorg], (err, resultOrganisme) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
    if (resultOrganisme.length === 0) {
      return res.status(404).json({ success: false, message: 'Organisme not found' });
    }

    const organisme = resultOrganisme[0];

    db_org.query(sqlAppareils, [idorg], (err, resultAppareils) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
      }

      db_org.query(sqlJamf, [idorg], (err, resultJamf) => {
        if (err) {
          console.error('Database query error:', err);
          return res.status(500).json({ success: false, message: 'Server error' });
        }

        db_org.query(sqlAppli, [idorg], (err, resultAppli) => {
          if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ success: false, message: 'Server error' });
          }

          res.status(200).json({
            organisme,
            appareils: resultAppareils,
            jamf: resultJamf,
            appli: resultAppli,
          });
        });
      });
    });
  });
});
/*supprimer des organismes */
app.delete('/deleteorganisme/:id', (req, res) => {
  const { id } = req.params;

  // Supprimer les applications correspondant à l'idorg
  const deleteApplicationsSql = 'DELETE FROM application WHERE idorg = ?';
  // Supprimer les entrées jamf correspondant à l'idorg
  const deleteJamfSql = 'DELETE FROM jamf WHERE idorg = ?';
  // Supprimer les appareils correspondant à l'idorg
  const deleteAppareilsSql = 'DELETE FROM appareils WHERE idorg = ?';
  // Supprimer l'organisme correspondant à l'idorg
  const deleteOrganismeSql = 'DELETE FROM organisme WHERE idorg = ?';

  db_org.query(deleteApplicationsSql, [id], (err, result) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }

    db_org.query(deleteJamfSql, [id], (err, result) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
      }

      db_org.query(deleteAppareilsSql, [id], (err, result) => {
        if (err) {
          console.error('Database query error:', err);
          return res.status(500).json({ success: false, message: 'Server error' });
        }

        db_org.query(deleteOrganismeSql, [id], (err, result) => {
          if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ success: false, message: 'Server error' });
          }

          res.status(200).json({ success: true, message: 'Organisme supprimé avec succès' });
        });
      });
    });
  });
});

/*afficher seulement les ecoles d'une personne*/
// Route pour récupérer les écoles d'un utilisateur spécifique
app.get('/infoschools/:userId', (req, res) => {
  const { userId } = req.params;

  // Valider que userId est un nombre (ou un autre type selon votre base de données)
  if (!userId || isNaN(userId)) {
      return res.status(400).json({ success: false, message: 'Invalid user ID' });
  }

  const query = 'SELECT * FROM infoecole WHERE idutilisateur = ?';

  db_school.query(query, [userId], (err, results) => {
      if (err) {
          console.error('Database query error:', err);
          return res.status(500).json({ success: false, message: 'Server error' });
      }

      res.status(200).json(results);
  });
});
/*afficher seulement les ecoles d'une personne*/
// Route pour récupérer les écoles d'un utilisateur spécifique
app.get('/infoorg/:userId', (req, res) => {
  const { userId } = req.params;
  // Valider que userId est un nombre (ou un autre type selon votre base de données)
  if (!userId || isNaN(userId)) {
      return res.status(400).json({ success: false, message: 'Invalid user ID' });
  }
  const query = 'SELECT * FROM organisme WHERE idutilisateur = ?';

  db_org.query(query, [userId], (err, results) => {
      if (err) {
          console.error('Database query error:', err);
          return res.status(500).json({ success: false, message: 'Server error' });
      }

      res.status(200).json(results);
  });
});

/*telecharger le excel*/
/* Télécharger le fichier Excel */
app.get('/downloadExcel/:idecole', (req, res) => {
  const { idecole } = req.params;

  // Fetch data from multiple tables
  const queries = {
    ecole: "SELECT * FROM infoecole WHERE idecole = ?",
    eleves: "SELECT * FROM eleves WHERE idecole = ?",
    classes: "SELECT * FROM classes WHERE idecole = ?",
    professeurs: `
      SELECT p.*, GROUP_CONCAT(c.nom SEPARATOR ', ') AS classes
      FROM professeurs p
      LEFT JOIN profclasse pc ON p.idprof = pc.idprof
      LEFT JOIN classes c ON pc.idclasse = c.idclasse
      WHERE p.idecole = ?
      GROUP BY p.idprof
    `,
    appareils: "SELECT * FROM appareils WHERE idecole = ?",
    application: "SELECT * FROM applications WHERE idecole = ?"
  };

  let workbook = XLSX.utils.book_new();

  const fetchData = (query, tableName) => {
    return new Promise((resolve, reject) => {
      db_school.query(query, [idecole], (err, results) => {
        if (err) {
          console.error(`Error fetching data for ${tableName}:`, err);
          return reject(err);
        }
        console.log(`Data fetched for ${tableName}:`, results); // Log fetched data
        const ws = XLSX.utils.json_to_sheet(results);
        XLSX.utils.book_append_sheet(workbook, ws, tableName);
        resolve();
      });
    });
  };

  Promise.all([
    fetchData(queries.ecole, 'Ecole'),
    fetchData(queries.eleves, 'Eleves'),
    fetchData(queries.classes, 'Classes'),
    fetchData(queries.professeurs, 'Professeurs'),
    fetchData(queries.appareils, 'Appareils'),
    fetchData(queries.application, 'Application')
  ])
    .then(() => {
      // Create a buffer from the workbook and send it as a file download
      const filePath = path.join(__dirname, 'report.xlsx');
      XLSX.writeFile(workbook, filePath);
      
      console.log(`Workbook created at ${filePath}`);

      res.download(filePath, 'report.xlsx', (err) => {
        if (err) {
          console.error('Error downloading file:', err);
        }
        fs.unlinkSync(filePath); // Clean up the file after sending
      });
    })
    .catch((err) => {
      console.error('Error fetching data or generating file:', err);
      res.status(500).send('Internal Server Error');
    });
});



// Fonction pour supprimer les données associées aux organismes
const deleteOrganismesAndRelatedData = (userId, callback) => {
  const query = 'SELECT idorg FROM organisme WHERE idutilisateur = ?';
  db_org.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error retrieving organizations:', err);
      return callback(err);
    }

    const idorgs = results.map(row => row.idorg);

    if (idorgs.length > 0) {
      const deleteQueries = [
        'DELETE FROM appareils WHERE idorg IN (?)',
        'DELETE FROM jamf WHERE idorg IN (?)',
        'DELETE FROM application WHERE idorg IN (?)',
        'DELETE FROM organisme WHERE idorg IN (?)'
      ];

      let completedQueries = 0;
      const totalQueries = deleteQueries.length;

      deleteQueries.forEach(query => {
        db_org.query(query, [idorgs], (err) => {
          if (err) {
            console.error('Error deleting related data:', err);
            return callback(err);
          }
          completedQueries += 1;
          if (completedQueries === totalQueries) {
            callback(null);
          }
        });
      });
    } else {
      callback(null);
    }
  });
};

// Fonction pour supprimer les données associées aux écoles
const deleteEcolesAndRelatedData = (userId, callback) => {
  const query = 'SELECT idecole FROM infoecole WHERE idutilisateur = ?';
  db_school.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error retrieving schools:', err);
      return callback(err);
    }

    const idecoles = results.map(row => row.idecole);

    if (idecoles.length > 0) {
      const deleteQueries = [

        'DELETE FROM infoecole WHERE idecole IN (?)',
        'DELETE FROM profclasse WHERE idecole IN (?)',
        'DELETE FROM classes WHERE idecole IN (?)',
        'DELETE FROM eleves WHERE idecole IN (?)',
        'DELETE FROM professeurs WHERE idecole IN (?)'
        
      ];

      let completedQueries = 0;
      const totalQueries = deleteQueries.length;

      deleteQueries.forEach(query => {
        db_school.query(query, [idecoles], (err) => {
          if (err) {
            console.error('Error deleting related data:', err);
            return callback(err);
          }
          completedQueries += 1;
          if (completedQueries === totalQueries) {
            callback(null);
          }
        });
      });
    } else {
      callback(null);
    }
  });
};
/*supprimer utilisateurs*/
app.delete('/deleteusers/:id', (req, res) => {
  const userId = req.params.id;
  const query = 'SELECT nature FROM login WHERE id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).send('Internal Server Error');
    }

    if (results.length === 0) {
      return res.status(404).send('User not found');
    }

    const user = results[0];
    console.log('User nature:', user.nature);

    if (user.nature === 'ecole') {
      deleteEcolesAndRelatedData(userId, (err) => {
        if (err) {
          console.error('Error deleting schools and related data for school:', err);
          return res.status(500).send('Internal Server Error');
        }
        deleteUser(userId, res);
      });
    } else if (user.nature === 'organisme') {
      deleteOrganismesAndRelatedData(userId, (err) => {
        if (err) {
          console.error('Error deleting organizations and related data for organisme:', err);
          return res.status(500).send('Internal Server Error');
        }
        deleteUser(userId, res);
      });
    } else {
      return res.status(400).send('Unsupported user nature');
    }
  });
});

const deleteUser = (userId, res) => {
  const query = 'DELETE FROM login WHERE id = ?';
  db.query(query, [userId], (err) => {
    if (err) {
      console.error('Error deleting user:', err);
      return res.status(500).send('Internal Server Error');
    }
    console.log('User and associated data deleted successfully'); // Log de succès
    res.status(200).send('User and associated data deleted');
  });
};
/*page de contact créer un message*/
app.post('/submit-message', async (req, res) => {
  const { userId, userEmail, message, nom } = req.body;

  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois sont indexés à partir de 0
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

  const query = 'INSERT INTO messages (iduser, email, message, nom, date) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [userId, userEmail, message, nom, formattedDate], (err, result) => {
    if (err) {
      console.error('Error inserting message:', err);
      res.status(500).json({ message: 'Error inserting message' });
    } else {
      // Envoyer l'e-mail
      sendEmail(userEmail, message, nom)
        .then(() => {
          res.status(200).json({ message: 'Message submitted successfully' });
        })
        .catch((error) => {
          console.error('Error sending email:', error);
          res.status(500).json({ message: 'Error sending email' });
        });
    }
  });
});
async function sendEmail(userEmail, message, nom) {
  console.log(userEmail)
  // Créez un transporteur réutilisable en utilisant le transport SMTP par défaut
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // utiliser la variable d'environnement pour l'adresse e-mail
      pass: process.env.EMAIL_PASS // utiliser la variable d'environnement pour le mot de passe d'application
    }
  });

  // Définissez les options de l'e-mail
  let mailOptions = {
    from: userEmail, // adresse de l'expéditeur
    to: process.env.EMAIL_USER, // adresse du destinataire (votre adresse e-mail)
    subject: `Message from ${nom}`, // sujet de l'e-mail
    text: message , // contenu de l'e-mail en texte brut
    html: `<b>${message}</b>` // contenu de l'e-mail en HTML
  };

  // Envoyez l'e-mail avec les options définies ci-dessus
  return transporter.sendMail(mailOptions);
}

/*recuperer les messages pour l'admin*//*
app.get('/messages', (req, res) => {
  const query = 'SELECT * FROM messages';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching messages:', err);
      res.status(500).send('Error fetching messages');
    } else {
      res.status(200).json(results);
    }
  });
});*/



app.listen(8081, () => {
    console.log("Listening on port 8081");
});