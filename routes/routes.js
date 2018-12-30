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
    // admin
    app.get("/admin_007", basicAuth({users: { 'admin': process.env.ADMIN_PASS }, challenge: true}), (req, res) => {
      db.Shows.find({date: { "$gte": 946684800000 }}).then(function(shows) {
        const showsArr = showArrFormatter(shows, true);
        res.render("admin", {showsArr});
      });
    });

    // homepage and all other routes
    app.get(["/", "*"], (req, res) => {
      const date = new Date();
      const yesterdaysDate = date.setDate(date.getDate() - 1);
        db.Shows.find({date: { "$gte": yesterdaysDate }}).then(function(shows) {
          const showsArr = showArrFormatter(shows, false);
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
    const _id = req.body.showId;

    db.Shows
      .deleteOne({_id})
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
    const _id = req.body.id;
    const { location } = req.body;
    const { date } = req.body;
    const { link } = req.body;

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