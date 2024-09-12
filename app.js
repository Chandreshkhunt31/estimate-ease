const express = require("express");
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

require('./app/config/db')
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var routes = require("./app/routes"); 
app.use('/', routes);

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT http://localhost/"+ PORT);
});
