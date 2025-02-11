const mysql = require('mysql2');
require('dotenv').config();

var connection = mysql.createConnection({
    port: process.env.DB_PORT,
    host:process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectTimeout: 10000

});

connection.connect((err)=>{
    if(!err){
        console.log("Connected Successfully")
        console.log(`Server is running on 8080`)
    }
    else {
        console.log(err);
    }
});

module.exports =connection;