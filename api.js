var Fortnite = require('fortnite-api'),
  express = require('express'),
  app = express(),
  morgan = require('morgan'),
  auth = [
    process.env.LOGIN_EMAIL,
    process.env.LOGIN_PASSWORD,
    process.env.OAUTH_EPIC_LAUNCHER,
    process.env.OAUTH_FORTNITE
  ];

//checl auth
auth.forEach(function(item, index) {
  if (!item) {
    switch (index) {
      case 0:
        console.log('LOGIN_EMAIL is missing');
        break;
      case 1:
        console.log('LOGIN_PASSWORD is missing');
        break;
      case 2:
        console.log('OAUTH_EPIC_LAUNCHER is missing');
        break;
      case 3:
        console.log('OAUTH_FORTNITE is missing');
        break;
    }
    process.exit();
  }
})

app.use(morgan('dev'));
app.set('port', process.env.PORT || 3000);
app.all('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


// Authentification
var fortniteAPI = new Fortnite(auth);

// get user by name
app.get('/v1/user/:platform/:username', function(req, res) {
  var username = req.params.username;
  var platform = req.params.platform;
  fortniteAPI.login()
    .then(() => {
      fortniteAPI.checkPlayer(username, platform)
        .then((stats) => {
          res.json(stats);
        })
        .catch((err) => {
          if (err === "Player Not Found") {
            res.status(404).send({
              code: 404,
              message: err
            });
          } else if (err === "Impossible to fetch User. User not found on this platform") {
            res.status(404).send({
              code: 404,
              message: err
            });
          } else {
            res.status(500).send({
              code: 500,
              message: err
            });
          }
          console.log(err);
        });
    });
});

// get user stats by name
app.get('/v1/stats/:platform/:username', function(req, res) {
  var username = req.params.username;
  var platform = req.params.platform;
  fortniteAPI.login()
    .then(() => {
      fortniteAPI.getStatsBR(username, platform)
        .then((stats) => {
          res.json(stats);
        })
        .catch((err) => {
          if (err === "Player Not Found") {
            res.status(404).send({
              code: 404,
              message: err
            });
          } else if (err === "Impossible to fetch User. User not found on this platform") {
            res.status(404).send({
              code: 404,
              message: err
            });
          } else {
            res.status(500).send({
              code: 500,
              message: err
            });
          }
          console.log(err);
        });
    });
});

// get users stats by user id
app.get('/v1/statsById/:platform/:user', function(req, res) {
  var id = req.params.user;
  var platform = req.params.platform;
  fortniteAPI.login()
    .then(() => {
      fortniteAPI.getStatsBR(id, platform)
        .then((stats) => {
          res.json(stats);
        })
        .catch((err) => {
          if (err === "Player Not Found") {
            res.status(404).send({
              code: 404,
              message: err
            });
          } else if (err === "Impossible to fetch User. User not found on this platform") {
            res.status(404).send({
              code: 404,
              message: err
            });
          } else {
            res.status(500).send({
              code: 500,
              message: err
            });
          }
          console.log(err);
        });
    });
})

// get fortnite news
app.get('/v1/news/:lang?', function(req, res) {
  var language = req.params.lang;
  if (!language) {
    language = 'en';
  }
  console.log(language);
  fortniteAPI.login()
    .then(() => {
      fortniteAPI.getFortniteNews(language)
        .then((news) => {
          res.json(news);
        })
        .catch((err) => {
          res.status(500).send({
            code: 500,
            message: err
          });
          console.log(err);
        });
    });
})

// get fortnite status
app.get('/v1/check', function(req, res) {
  fortniteAPI.login()
    .then(() => {
      fortniteAPI.checkFortniteStatus()
        .then((status) => {
          res.json(status);
        })
        .catch((err) => {
          res.status(500).send({
            code: 500,
            message: err
          });
          console.log(err);
        });
    });
})

// get pve info
app.get('/v1/pve', function(req, res) {
  fortniteAPI.login()
    .then(() => {
      fortniteAPI.getFortnitePVEInfo()
        .then((status) => {
          res.json(status);
        })
        .catch((err) => {
          res.status(500).send({
            code: 500,
            message: err
          });
          console.log(err);
        });
    });
})

// get store
app.get('/v1/store', function(req, res) {
  fortniteAPI.login()
    .then(() => {
      fortniteAPI.getStore()
        .then((store) => {
          res.json(store);
          console.log(store);
        })
        .catch((err) => {
          res.status(500).send({
            code: 500,
            message: err
          });
          console.log(err);
        });
    });
})

// start server
app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'))
});

process.on('SIGINT', function() {
  process.exit();
});
