var express = require("express");
var cors = require('cors');
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var studentRouter = require("./routes/students");
var cocktailRouter = require("./routes/cocktails");

var app = express();

var mongoose = require("mongoose");

var connexionStringLocal =
  "mongodb+srv://Lilian:yScqkSzI13T3c9uh@iut.kfbdc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

var mongodb = process.env.MONGO_URI || connexionStringLocal;
mongoose.connect(mongodb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(cors())
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/students", studentRouter);
app.use("/cocktails", cocktailRouter);

module.exports = app;
