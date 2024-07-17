require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../backend/database');

router.delete('/logout', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const userId = decoded.userId;
    const query = `UPDATE users SET authenticationToken = NULL WHERE id = ?`;
    db.query(query, [userId], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
      }
      res.status(200).json({ message: 'Logged out successfully' });
    });
  });
});
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
       /* let token = jwt.sign({ id: result[0].id }, secretKey, { expiresIn: '1h' });*/
        const token = jwt.sign({ id: result[0].id, email: result[0].email, statut: result[0].statut }, secretKey, { expiresIn: '1h' });

        /*res.send({ token, status: result[0].status});*/
        res.send({ token, email: result[0].email, statut: result[0].statut });
      } else {
        res.send('Password does not match...');
      }
    });
  });
});



module.exports = router;
