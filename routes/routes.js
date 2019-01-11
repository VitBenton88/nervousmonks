// Load Helper functions
// =============================================================
const helperFunctions = require("../utils/HelperFunctions");

// Routes
// =============================================================
module.exports = function(app, basicAuth, db) {
    // GET
    // =============================================================
    // admin
    app.get("/admin_007", basicAuth({users: { 'admin': process.env.ADMIN_PASS }, challenge: true}), (req, res) => {
      db.Shows.find({date: { "$gte": 946684800000 }})
        .then(function(shows) {
          const showsArr = helperFunctions.showArrFormatter(shows, true);
          res.render("admin", {showsArr, messages: req.flash()});
        })
      .catch((error) => {
          // If an error occurred, send it to the client
          console.log(error);
          db.Shows.find({date: { "$gte": 946684800000 }})
          .then(function(shows) {
            res.render("admin");
          });
      });
    });

    // homepage and all other routes
    app.get(["/", "*"], (req, res) => {
      const date = new Date();
      const yesterdaysDate = date.setDate(date.getDate() - 1);
        db.Shows.find({date: { "$gte": yesterdaysDate }})
        .then(function(shows) {
          const showsArr = helperFunctions.showArrFormatter(shows, false);
          res.render("index", {showsArr});
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
        req.flash(
          'success_msg',
          `Show at ${result.location} successfully created.`
        );
        res.redirect('/admin_007');
      })
      .catch((error) => {
      // If an error occurred, send it to the client
      console.log(error);
      req.flash('error_msg', error);
      res.redirect('/admin_007');
    });
  });

  // delete show
  app.post("/deleteshow", (req, res) => {
    const _id = req.body.showId;

    db.Shows
      .deleteOne({_id})
      .then((result) => {
        res.redirect('/admin_007');
      })
      .catch((err) => {
      // If an error occurred, send it to the client
      console.log(err);
      res.send(false);
    });
  });

  // update show
  app.post("/updateshow", (req, res) => {
    const _id = req.body.id;
    const { location, date, link } = req.body;

    db.Shows
      .updateOne({_id},{location, date, link})
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