const db = require("../models");

module.exports = function(app) {

    // Home Page view
  app.get("/", function(req, res) {
    var articlesObj = {};

    articlesObj["articles"] = [];

    db.Headline.find({ $query: { saved: false } })
      .sort({ date: -1 })
      .then(function(found) {
        if (found.length > 0) {
          for (let i = 0; i < found.length; i++) {
            newObject = {
              id: found[i]._id,
              headline: found[i].headline,
              summary: found[i].summary,
              link: found[i].link,
              saved: found[i].saved,
              notes: found[i].notes
            };

            articlesObj.articles.push(newObject);

            if (i == found.length - 1) {
              res.render("home", articlesObj);
            }
          }
        } else {
          res.render("home");
        }
      });
  });


//   Favorites view
  app.get("/saved", function(req, res) {
    var articlesObj = {};

    articlesObj["articles"] = [];

    db.Headline.find({ saved: true })
      .sort({ date: -1 })
      .then(function(found) {
        if (found.length > 0) {
          for (let i = 0; i < found.length; i++) {
            console.log(found[i]);

            newObject = {
              id: found[i]._id,
              headline: found[i].headline,
              summary: found[i].summary,
              link: found[i].link,
              saved: found[i].saved,
              notes: found[i].notes
            };

            articlesObj.articles.push(newObject);

            if (i == found.length - 1) {
              res.render("saved", articlesObj);
            }
          }
        } else {
          res.render("saved");
        }
      });
  });
};
