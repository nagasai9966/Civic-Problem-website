const express = require("express")
const bodyParser = require('body-parser')
const app = express()
const con = require("./models/connection")
let usernames = new Array();
let passwords = new Array();
let nameofuser = '';

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/Structure", function (req, res) {
  username = req.body.username;
  let passw = req.body.password;
  for (let i = 0; i < usernames.length; i++) {
    if (username == usernames[i]) {
      if (passw == passwords[i]) {
        res.redirect("/page2");
      }
    } else {
      res.redirect("/structure");
    }
  }
});
app.post("/show", function (req, res) {
  res.redirect("/page3");
});
app.post("/register", function (req, res) {
  let usern = req.body.username;
  let passw = req.body.password;
  usernames.push(usern);
  passwords.push(passw);
  console.log(usern);
  res.redirect("/structure");
})
app.post("/page2", function (req, res) {
  let query = `INSERT INTO civicissue
        (username,userproblem,userlocation,dateidentified,image) VALUES (?, ? , ? ,? , ?);`;
  let userproblem = req.body.details;
  let userlocation = req.body.location;
  let date = req.body.date;
  let pitimage = req.body.image;
  con.query(query, [username, userproblem, userlocation, date, pitimage], (err, rows) => {
    if (err) throw err;
    console.log("Row inserted with id = "
      + rows.insertId);
  });
  res.redirect("/show");
});
app.post("/",function(req,res){
  username=req.body.username;
  res.redirect("/page2")
})

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/Structure.html");
});
app.get("/register", function (req, res) {
  res.sendFile(__dirname + "/register.html");
});
app.get("/structure", function (req, res) {
  res.sendFile(__dirname + "/Structure.html");
});
app.get("/create", (req, res) => {
  con.query("create table civicissue(username varchar(30),userproblem varchar(100) ,userlocation varchar(30),dateidentified date,image BLOB )", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  })
  res.send("Successfully created the userProblemdata")
})

app.get("/show", (req, res) => {

  con.query("SELECT * FROM civicissue", function (err, result, fields) {
    if (err) {
      console.log(err.message);
      return;
    }
    console.log(result);
    res.render("index2", { data: result });
  });
});
app.get("/page2", function (req, res) {

  res.render("index", { data: username });
});
app.get("/page3", function (req, res) {
  res.sendFile(__dirname + "/Structure2.html");
});

app.listen('3000', function () {
  console.log("server started at port:3000")
});