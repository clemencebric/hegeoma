const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 8082;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..')));

app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'demon3fire@gmail.com',
            pass: 'akku mhnv lxxt kdlg'
        }
    });

    const mailOptions = {
        from: 'demon3fire@gmail.com',
        to: 'demon3fire@gmail.com',
        subject: `Nouveau message de ${email}`,
        text: `Nom: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.json({ success: false, error: error.message });
        }
        res.json({ success: true, info: info.response });
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});