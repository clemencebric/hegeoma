require('dotenv').config(); //utiliser .env
const db = require('./database.js');
const db_school = require('./databaseecole.js');
const db_org = require('./databaseorganisme.js');
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
  const { idutilisateur, nom, adresse, codepostal, fournisseur, appareils = [], jamfs = [], appli, restriction } = req.body;

  const sqlInsertOrganisme = 'INSERT INTO organisme (idutilisateur, nom, adresse, codepostal, fournisseur, restrictions) VALUES (? ,? , ?, ?, ?, ?)';
  db_org.query(sqlInsertOrganisme, [idutilisateur, nom, adresse, codepostal, fournisseur, restriction], (err, result) => {
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
app.listen(8081, () => {
    console.log("Listening on port 8081");
});
