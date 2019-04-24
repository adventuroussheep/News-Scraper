var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

var db = require("./models");

var PORT = process.env.PORT || 3000;

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

var app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI || "mongodb://userRoot:passwordRoot1@ds145916.mlab.com:45916/heroku_frj9x7s3", {
    useMongoClient: true
});

require("./routes/index.js")(app);



app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});