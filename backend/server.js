const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

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
    const sql = "INSERT INTO login (`email`, `password`) VALUES (?, ?)";

    const values = [
        req.body.email,
        req.body.password
    ]
    db.query(sql, values, (err, data) => {
        if(err){
            console.error("Error during insertion:", err);
            return res.json("Error");
        }
        return res.json(data);
    })
})
app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    const sql = 'SELECT * FROM login WHERE email = ? AND password = ?'; // Mettez à jour cette ligne
    db.query(sql, [email, password], (err, result) => {
      if (err) {
        res.status(500).json({ message: 'An error occurred while processing your request.' });
      } else {
        if (result.length > 0) {
          res.status(200).json({ message: 'Login successful' });
        } else {
          res.status(401).json({ message: 'Login failed. Invalid username or password.' });
        }
      }
    });
  });
  


app.listen(8081, ()=> {
    console.log("listeninng");
})