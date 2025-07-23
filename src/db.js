
const mysql = require("mysql2")

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database: 'dmrc'
});

db.connect((err)=> {
    if (err){
        console.log("database connection failed" , err)
        return;
    }
    console.log("connected to my database")
});

module.exports  =db;