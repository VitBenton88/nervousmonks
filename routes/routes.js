// Dependencies
// =============================================================
const db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
    // homepage route
    app.get("/", (req, res) => {
        db.Shows.find({date: { "$gte": Date.now() }}).then(function(shows) {
          // results are available to us inside the .then
          res.render("index", {shows});
        });
      });

    // redirect any route to homepage
    app.get("/*", (req, res) => {
      db.Shows.find({date: { "$gte": Date.now() }}).then(function(shows) {
          // results are available to us inside the .then
          res.render("index", {shows});
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
