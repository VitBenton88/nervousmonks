// Dependencies
// =============================================================
const basicAuth = require('express-basic-auth');
const db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
    // GET
    // =============================================================
    // homepage
    app.get("/", (req, res) => {
        db.Shows.find({date: { "$gte": Date.now() }}).then(function(shows) {
          res.render("index", {shows});
        });
      });

    // admin
    app.get("/admin_007", basicAuth({users: { 'admin': '#WJKc70r78c5PR&l' }, challenge: true}), (req, res) => {
      db.Shows.find({date: { "$gte": 946684800000 }}).then(function(shows) {
        res.render("admin", {shows});
      });
    });

    // redirect any route to homepage
    app.get("/*", (req, res) => {
      db.Shows.find({date: { "$gte": Date.now() }}).then(function(shows) {
          res.status(404).render("index", {shows});
        });
      });

    //handle Googles robots
    app.get('/robots.txt', (req, res) => {
        res.type('text/plain');
        res.send("User-agent: *\nDisallow: /");
    });

    //handle sitemap request
    app.get('/sitemap.xml', (req, res) => {
        res.send("./public/sitemap.xml");
    });

  // POST
  // =============================================================
  // add show
  app.post("/show", (req, res) => {
    var show = req.body;
    db.Shows
      .create(show)
      .then((result) => {
        res.send(true);
      })
      .catch((err) => {
      // If an error occurred, send it to the client
      console.log(err);
      res.send(false);
    });
  });
};