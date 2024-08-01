require('dotenv').config();
const mysql = require('mysql');

const db_org = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    port: process.env.DB_PORT,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_ORG_NAME
});

db_org.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the organisme database.');
});

module.exports = db_org;
