var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');
var massive = require('massive');
var config = require('./config.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var corsOptions = {
  origin: 'http://localhost:56914'
};

var db = massive.connectSync({
  db: 'rgs'
});

var app = module.exports = express();
app.set('db', db);
// var app = module.exports = express();
// app.set('database', massive.connectSync({
//   db: 'rgs'
// }));

var controller = require('./serverControl.js');

app.use(bodyParser.json());
app.use(cors());
// app.use(cors(corsOptions));

app.use(session({
  secret: config.sessionSecret,
  saveUnitialized: true,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session());


// app.use(express.static('./public'));
app.use(express.static(__dirname + '/public'));



/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
AUTH
  LocalAuth functions and endpoints
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function restrict(req, res, next) {
    if(req.isUnauthenticated()) return res.status(403).json({message: 'please login'});
    next();
}

passport.use(new LocalStrategy(
  function(username, password, done) {
    db.users.findOne({username: username}, function(err, user) {
      console.log('user = ' + user);
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (user.password != password) { return done(null, false); }
      return done(null, user); //Returns user object for endpoints to use
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.getUserById([id], function(err, user) {
    // user = user[0];
    if (err) console.log(err);
    else console.log('RETRIEVED USER');
    console.log(user);
    done(null, user);
  });
});

app.post('/auth/local', passport.authenticate('local'), function(req, res) {
  // console.log('req user is here: ' + req.user);
  res.status(200).send(req.user); //Sends user, used by loginControl's loginLocal then()
});

app.get('/auth/me', restrict, function(req, res) {
  // console.log('req.user = ' + req.user);
  if (!req.user) return res.sendStatus(404);
  res.status(200).send(req.user);
});

app.get('/auth/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});
/* End of auth functions and endpoints */






app.get('/api/users', controller.getUsers);
app.get('/api/users/:id', controller.getThisUser);

app.put('/api/users/:id', controller.updateUser);

app.get('/api/products', controller.getProducts);

app.put('/api/products/:id', controller.updateProducts);


var port = config.port;
app.listen(port, function() {
  console.log('Listening now on port ' + port);
});
