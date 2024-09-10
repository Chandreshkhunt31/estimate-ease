const express = require("express");
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

var bodyParser = require("body-parser");
require('./app/config/db')
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.all("/", (req,res) => {
  return res.status(200).send("Connected... wohoo");
});

var routes = require("./app/routes"); 
app.use('/', routes);

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT http://localhost/"+ PORT);
});
