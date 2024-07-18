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


function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) return res.status(403).send('Access denied...');

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) return res.status(401).send('Invalid token...');

        req.userId = decoded.id;
        next();
    });
}

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
    const sql = "INSERT INTO infoecole (`idutilisateur`, `nom`, `adresse`, `ville`, `codepostal`, `nomdomaine`) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [req.body.idutilisateur, req.body.nom, req.body.adresse, req.body.ville, req.body.codepostal, req.body.nomdomaine];
    db_school.query(sql, values, (err, data) => {
        if (err) {
            console.error("Error during insertion:", err);
             return res.status(500).json({ error: "Error inserting data" });
        }
        return res.status(201).json({ success: true, message: "School created" });
    });
    });
/*afficher les ecoles*/
app.get('/school', (req, res) => {
    const sql = 'SELECT * FROM infoecole';
    db_school.query(sql, (err, results) => {
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
