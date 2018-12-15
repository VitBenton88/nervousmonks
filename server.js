// Dependencies
// =============================================================
const express = require("express");
const exphbs  = require('express-handlebars');
const bodyParser = require("body-parser");
const compression = require('compression');
const path = require("path");
const mongoose = require("mongoose");
const basicAuth = require('express-basic-auth');
const dotenv = require('dotenv');

// Check for production
// =============================================================
const production = process.env.NODE_ENV == "production" ? true : false;

// Require all models
// =============================================================
const db = require("./models");

// Sets up the Express App
// =============================================================
const app = express();
let PORT = process.env.PORT || 3000;

// Sets up the Express with Handlebars
// =============================================================
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Sets up the Express app to handle data parsing
// =============================================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
  type: "application/vnd.api+json"
}));

//Establish if in production
// =============================================================
if (production) {
    // compress responses
    app.use(compression());
    // permit access to public file
    app.use(express.static(path.join(__dirname, '/public'), {maxage: '1y'}));
} else {
    //load environment variables
    dotenv.config();

    // permit access to public file
    app.use(express.static(path.join(__dirname, '/public')))
};

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
// =============================================================
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/shows";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true
});

// Import Routes
// =============================================================
require("./routes/routes.js")(app, basicAuth, db, dotenv);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});