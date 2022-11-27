var mysql = require('mysql');
const con = mysql.createConnection({ host: "localhost", // host for connection 
    port: 3306, // default port for mysql is 3306 
    database: "prac", // database from which we want to connect out node application 
    user: "root", // username of the mysql connection 
    password: "password" // password of the mysql connection 
});
con.connect(function(err) {
    if (err) {
        console.log("error in db");
        console.log(err.message)
        return
    }
    console.log("Connected!");
  });

module.exports = con
