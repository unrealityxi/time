const express = require("express");

const path = require("path");

let app = express();

app.use(express.static("public"));

app.get('/*', function(req, res){
  res.sendFile(path.resolve(__dirname, "../public/index.html"));
});

app.listen(3000, console.log("App listening at port 3000"));