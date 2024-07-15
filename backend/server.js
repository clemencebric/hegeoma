const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key'; // Utilisez une clé secrète personnalisée pour signer les tokens

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const salt = 10;

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Remplacez par l'origine de votre application frontend
    methods: 'GET,POST,PUT,DELETE,INSERT,SELECT',
    allowedHeaders: 'Content-Type,Authorization'
}));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

app.post('/signup', (req, res) => {
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if (err) return res.status(500).json({ Error: "Error for hashing password" });

        const sql = "INSERT INTO login (`email`, `password`) VALUES (?, ?)";
        const values = [
            req.body.email,
            hash
        ];
        db.query(sql, values, (err, data) => {
            if (err) {
                console.error("Error during insertion:", err);
                return res.status(500).json("Error");
            }
            return res.status(201).json(data);
        });
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const sql = `SELECT * FROM login WHERE email = ?`;
    db.query(sql, [email], (err, result) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ success: false, message: 'Server error' });
        }

        if (result.length === 0) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }

        bcrypt.compare(password, result[0].password, (err, response) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                return res.status(500).json({ success: false, message: 'Server error' });
            }

            if (response) {
                const token = jwt.sign({ id: result[0].id }, secretKey, { expiresIn: '1h' });
                return res.status(200).json({ success: true, message: 'Login successful', token });
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

app.listen(8081, () => {
    console.log("Listening on port 8081");
});
