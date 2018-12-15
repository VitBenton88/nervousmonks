// Dependencies
// =============================================================
const basicAuth = require('express-basic-auth');
const db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
    // homepage
    app.get("/", (req, res) => {
        db.Shows.find({date: { "$gte": Date.now() }}).then(function(shows) {
          // results are available to us inside the .then
          res.render("shows", {shows});
        });
      });

    // admin
    app.get("/admin_007", basicAuth({users: { 'admin': '#WJKc70r78c5PR&l' }, challenge: true}), (req, res) => {
      db.Shows.find({date: { "$gte": Date.now() }}).then(function(shows) {
        // results are available to us inside the .then
        res.render("shows", {layout: "admin", shows});
      });
    });

    // redirect any route to homepage
    app.get("/*", (req, res) => {
      db.Shows.find({date: { "$gte": 946684800000 }}).then(function(shows) {
          // results are available to us inside the .then
          res.status(404).render("shows", {shows});
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
};