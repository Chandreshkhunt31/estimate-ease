const express = require("express");
require('dotenv').config();
var routes = require("./app/routes"); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/', routes);

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
