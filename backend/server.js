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
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
  }));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
})

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

app.post('/signup', (req, res) => {
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if(err) return res.json({Error: "Error for hashing password"});

        const sql = "INSERT INTO login (`email`, `password`) VALUES (?, ?)";
        const values = [
            req.body.email,
            hash
        ]
        db.query(sql, values, (err, data) => {
            if(err){
                console.error("Error during insertion:", err);
                return res.json("Error");
            }
            return res.json(data);
        })
    })
})

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    let sql = `SELECT * FROM login WHERE email = ?`;
    db.query(sql, [email], (err, result) => {
      if (err) throw err;

      if (result.length === 0) {
        return res.send('User not found...');
      }

      bcrypt.compare(password, result[0].password, (err, response) => {
        if (err) throw err;

        if (response) {
          let token = jwt.sign({ id: result[0].id }, secretKey, { expiresIn: '1h' });
          res.send({ token });
        } else {
          res.send('Password does not match...');
        }
      });
    });
  });

  function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) return res.send('Access denied...');

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) return res.send('Invalid token...');

      req.userId = decoded.id;
      next();
    });
  }

  app.get('/profile', verifyToken, (req, res) => {
    let sql = `SELECT * FROM login WHERE id = ${req.userId}`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });

app.listen(8081, ()=> {
    console.log("listeninng");
})
