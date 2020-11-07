// Dependencies
// =============================================================
const express = require("express");
const cookieParser = require('cookie-parser')
const session = require('express-session');
const exphbs  = require('express-handlebars');
const bodyParser = require("body-parser");
const compression = require('compression');
const flash = require('connect-flash');
const path = require("path");
const mongoose = require("mongoose");
const basicAuth = require('express-basic-auth');
const dotenv = require('dotenv');
const validator = require('validator');

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

// Sets up Cookies with the Express App
// =============================================================
app.use(cookieParser('keyboardCats'));

// Sets up the Express app to use session
// =============================================================
app.use(session({
  secret: 'keyboardCats',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

// Connect Flash and setup global variables to be passed into every view
// =============================================================
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


// Sets up the Express app to handle data parsing
// =============================================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));

// Check for production
// =============================================================
const production = process.env.NODE_ENV == "production";

// Make appropriate changes if on production
// =============================================================
if (production) {
    // compress responses
    app.use(compression());
    // permit access to public file
    app.use(express.static(path.join(__dirname, '/public'), {maxage: '1y'}));
    // force https on heroku
    app.use((req, res, next) => {
      if (req.header('x-forwarded-proto') !== 'https' && process.env._.indexOf("heroku")) {
        res.redirect(`https://${req.header('host')}${req.url}`)
      } else {
        next();
      }
    });
} else {
    //load environment variables
    dotenv.config();
    // permit access to public file
    app.use(express.static(path.join(__dirname, '/public')))
};

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
// =============================================================
const MONGODB_URI = process.env.DB_URI || "mongodb://localhost/shows";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true
});

// Import Routes
// =============================================================
require("./routes/routes.js")(app, basicAuth, db, validator);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});