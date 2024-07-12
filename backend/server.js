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

app.listen(8081, ()=> {
    console.log("listeninng");
})