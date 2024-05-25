const express = require("express");
const flash = require("express-flash");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");

//////////////////////////////////////////////
/////Setting Up middlewares for express///////
/////////////////////////////////////////////

app.use(flash());
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
	})
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

app.set("view engine", "ejs");

////////////////////////////////////////////
//Connecting to the MongoDB Altas Database//
////////////////////////////////////////////
// Construct the MongoDB URI
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PWD;
const dbName = process.env.DB_NAME;
// const uri = `mongodb+srv://${dbUser}:${dbPassword}@fortunefolkscluster.rnom8q6.mongodb.net/?retryWrites=true&w=majority&appName=fortuneFolksCluster`;
const uri = `mongodb+srv://${dbUser}:${dbPassword}@fortunefolkscluster.rnom8q6.mongodb.net/?retryWrites=true&w=majority&appName=fortuneFolksCluster`;


// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB...');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
  });


///////////////////////////////////////////////`
//////////////Setting up routes////////////////
//////////////////////////////////////////////
const routes = require("./routes/routes.js");
app.use("/", routes);

//If no routes responded
app.use("/", (req, res) => {
	res.render("error404", { url: req.url });
});
/////////////////////////////////////////////
//////////// Starting the Server ////////////
/////////////////////////////////////////////
app.listen(process.env.PORT, () => {
	console.log("SERVER STARTED ON PORT 9000 IN LOCALHOST...");
});
