// Load Helper functions
// =============================================================
const helperFunctions = require("../utils/HelperFunctions");

// Global variables
// =============================================================

const minDate = { "$gte": 946684800000 };

// Routes
// =============================================================
module.exports = (app, basicAuth, db, validator) => {
    // GET
    // =============================================================
    // admin
    app.get("/admin_007", basicAuth({users: { 'admin': process.env.ADMIN_PASS }, challenge: true}), (req, res) => {
      db.Shows.find({date: minDate})
        .then(function(shows) {
          const showsArr = helperFunctions.showArrFormatter(shows, true);
          res.render("admin", {showsArr});
        })
      .catch((error) => {
          // If an error occurred, send it to the client
          console.log(error);
          req.flash('error_msg', error.message);
          db.Shows.find({date: minDate})
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
    const show = req.body;
    const { location, date, link } = show;

    //start validation chain ...
    if (!date) {
      req.flash('error_msg', 'No date provided!');
      res.redirect('/admin_007');
    } else if (!location) {
      req.flash('error_msg', 'No location provided!');
      res.redirect('/admin_007');
    } else if (!link) {
      req.flash('error_msg', 'No link provided!');
      res.redirect('/admin_007');
    } else if (!validator.isDataURI(date)) {
      req.flash('error_msg', 'The date provided is not an actual date or is in the wrong format!');
      res.redirect('/admin_007');
    } else if (!validator.isURL(link)) {
      req.flash('error_msg', 'The link provided is not an actual link!');
      res.redirect('/admin_007');
    } else {
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
        req.flash('error_msg', error.message);
        res.redirect('/admin_007');
      });
    }
  });

  // delete show
  app.post("/deleteshow", (req, res) => {
    const _id = req.body.showId;

    db.Shows
      .deleteOne({_id})
      .then((result) => {
        req.flash(
          'success_msg',
          `Show successfully deleted.`
        );
        res.redirect('/admin_007');
      })
      .catch((error) => {
      // If an error occurred, send it to the client
      console.log(error);
      req.flash('error_msg', error.message);
      res.redirect('/admin_007');
    });
  });

  // update show
  app.post("/updateshow", (req, res) => {
    const { _id, location, date, link } = req.body;

    db.Shows
      .updateOne({_id},{location, date, link})
      .then((result) => {
        req.flash(
          'success_msg',
          `Show successfully edited.`
        );
        res.redirect('/admin_007');
      })
      .catch((error) => {
      // If an error occurred, send it to the client
      console.log(error);
      req.flash('error_msg', error.message);
      res.redirect('/admin_007');
    });
  });
};