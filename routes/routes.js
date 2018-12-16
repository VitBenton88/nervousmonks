// Helper functions
// =============================================================
const showArrFormatter = (shows, admin) => {
  let showsArr = [];

  for (let i = 0; i < shows.length; i++) { 
    const { id } = shows[i];
    const { location } = shows[i];
    const { date } = shows[i];
    const { link } = shows[i];

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const dateToPrint = date.toLocaleDateString("en-US", options)
    
    const currentShowObjFormatted = {id, location, date, dateToPrint, link, admin}

    showsArr.push(currentShowObjFormatted);
  }

  return showsArr;
}

// Routes
// =============================================================
module.exports = function(app, basicAuth, db) {
    // GET
    // =============================================================
    // homepage
    app.get("/", (req, res) => {
        db.Shows.find({date: { "$gte": Date.now() }}).then(function(shows) {
          const showsArr = showArrFormatter(shows, false);
          res.render("index", {showsArr});
        });
    });

    // admin
    app.get("/admin_007", basicAuth({users: { 'admin': process.env.ADMIN_PASS }, challenge: true}), (req, res) => {
      db.Shows.find({date: { "$gte": 946684800000 }}).then(function(shows) {
        const showsArr = showArrFormatter(shows, true);
        res.render("admin", {showsArr});
      });
    });

    // redirect any route to homepage
    app.get("/*", (req, res) => {
      db.Shows.find({date: { "$gte": Date.now() }}).then(function(shows) {
        const showsArr = showArrFormatter(shows, false);
          res.status(404).render("index", {showsArr});
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

  // delete show
  app.post("/deleteshow", (req, res) => {
    var showId = req.body.showId;

    db.Shows
      .deleteOne({_id: showId})
      .then((result) => {
        res.send(true);
      })
      .catch((err) => {
      // If an error occurred, send it to the client
      console.log(err);
      res.send(false);
    });
  });

  // update show
  app.post("/updateshow", (req, res) => {
    var showId = req.body.id;

  //   db.Shows
  //     .deleteOne({_id: showId})
  //     .then((result) => {
  //       res.send(true);
  //     })
  //     .catch((err) => {
  //     // If an error occurred, send it to the client
  //     console.log(err);
  //     res.send(false);
  //   });
  // });
  });
};