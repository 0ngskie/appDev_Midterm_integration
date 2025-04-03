require("dotenv").config();

var mysql = require('mysql')

var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
});

con.connect(function(err) {
    if(err) {
        console.error('Error connecting to the database:', err.message);
        return;
    }
    console.log("Succesfully connected to the database named: ", process.env.DB_DATABASE);
});

module.exports = con;