/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  REQUIREMENTS
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jwt-simple');
var massive = require('massive');
var moment = require('moment');
var cors = require('cors');
// var stripe = require('stripe')(config.STRIPE_KEY);
// var corsOptions = {
//   origin: 'http://localhost:8002'
// };
// var bs = require('browser-sync').create();
// var session = require('express-session');
// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;

var app = module.exports = express();

try {
  var config = require('./config.js');
} catch (ex) {
  var config = {
    "port": 8002,
    "STRIPE_KEY": "",
    "TOKEN_SECRET": "marbles",
  };
}

var db = massive.connectSync({
  connectionString: process.env.DATABASE_URL
  // connectionString: 'postgres://ashman@localhost:5432/rgs'
});

// app.set('database', massive.connectSync({
//   db: 'rgs'
// }));

var app = module.exports = express();
app.set('db', db);

var controller = require('./serverControl.js');

app.use(bodyParser.json());
app.use(cors());
// app.use(cors(corsOptions));

// app.use(session({
//   secret: config.sessionSecret,
//   saveUnitialized: true,
//   resave: true
// }));
// app.use(passport.initialize());
// app.use(passport.session());

app.use(express.static(__dirname + '/public'));
// app.use(express.static('./public'));



/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
AUTH
  LocalAuth functions and endpoints
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

// function restrict(req, res, next) {
//     if(req.isUnauthenticated()) return res.status(403).json({message: 'please login'});
//     next();
// }
//
// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     db.users.findOne({username: username}, function(err, user) {
//       console.log('user = ' + user);
//       if (err) { return done(err); }
//       if (!user) { return done(null, false); }
//       if (user.password != password) { return done(null, false); }
//       return done(null, user); //Returns user object for endpoints to use
//     });
//   }
// ));
//
// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });
//
// passport.deserializeUser(function(id, done) {
//   db.getUserById([id], function(err, user) {
//     // user = user[0];
//     if (err) console.log(err);
//     else console.log('RETRIEVED USER');
//     console.log(user);
//     done(null, user);
//   });
// });
//
// app.post('/auth/local', passport.authenticate('local'), function(req, res) {
//   // console.log('req user is here: ' + req.user);
//   res.status(200).send(req.user); //Sends user, used by loginControl's loginLocal then()
// });
//
// app.get('/auth/me', restrict, function(req, res) {
//   // console.log('req.user = ' + req.user);
//   if (!req.user) return res.sendStatus(404);
//   res.status(200).send(req.user);
// });
//
// app.get('/auth/logout', function(req, res) {
//   req.logout();
//   res.redirect('/');
//   console.log('LOGGGGGED OUTT!!!');
// });
/* End of auth functions and endpoints */


/*
 |--------------------------------------------------------------------------
 | Login Required Middleware
 |--------------------------------------------------------------------------
 */
function ensureAuthenticated(req, res, next) {
  if (!req.header('Authorization')) {
    return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
  }
  var token = req.header('Authorization').split(' ')[1];

  var payload = null;
  try {
    payload = jwt.decode(token, config.TOKEN_SECRET);
  }
  catch (err) {
    return res.status(401).send({ message: err.message });
  }

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ message: 'Token has expired' });
  }
  // console.log('payload', payload);
  req.user = payload.sub;
  next();
}
/*
 |--------------------------------------------------------------------------
 | Generate JSON Web Token
 |--------------------------------------------------------------------------
 */
function createJWT(user) {
  var payload = {
    sub: user.id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix() // The time a person can stay logged in
  };
  return jwt.encode(payload, config.TOKEN_SECRET); // See JWT video
}

/*
 |--------------------------------------------------------------------------
 | GET /api/me
 |--------------------------------------------------------------------------
 */

app.get('/api/me', ensureAuthenticated, function(req, res) {
    if (!req.user) return res.status(404);
    var user = req.user;
    res.json(user);
  });

/*
 |--------------------------------------------------------------------------
 | PUT /api/me
 |--------------------------------------------------------------------------
 */
app.put('/api/me', ensureAuthenticated, function(req, res) {
  db.users.findById(req.user, function(err, user) {
    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }
    user.displayName = req.body.displayName || user.displayName;
    user.email = req.body.email || user.email;
    user.save(function(err) {
      res.status(200).end();
    });
  });
});


/*
 |--------------------------------------------------------------------------
 | Log in with Email
 |--------------------------------------------------------------------------
 */

 // comparePassword = function(password, userPassword, user){
 //     if (password === userPassword) {
 //       return true;
 //     }
 //   };

// app.post('/auth/login', function(req, res) {
//       db.users.findOne({username: req.body.username}, function(err, user) {
//           console.log('why?', req.body.username, req.body.password);
//           if (err) return res.status(500);
//           if (!user) {
//             return res.status(401).send({
//               message: 'Invalid username and/or password'
//             });
//           }
//           else if(!comparePassword(req.body.password, user.password, user)){
//             return res.status(401).send({
//               message: 'Invalid username and/or password'
//             });
//           }
//           res.send({
//             token: createJWT(user),
//             user: getSafeUser(user)
//           });
//
//     });
// });


app.post('/auth/login', function(req, res) {
      db.users.findOne({username: req.body.username}, function(err, user) {
          if (err) return res.status(500);
          if (!user) {
            return res.status(401).send({
              message: 'Invalid username and/or password'
            });
          }
          db.compare_password([req.body.password, user.id], function(err, correct) {
            if (err) {
              console.log(err);
            }
            if (correct[0]['?column?']) {
              res.send({
                token: createJWT(user),
                user: getSafeUser(user)
              });
            }
            else {
              res.status(401).send('Invalid username or password');
            }
          });


    });
});


/*
 |--------------------------------------------------------------------------
 | Create Email and Password Account
 |--------------------------------------------------------------------------
 */
app.post('/auth/signup', function(req, res) {
  db.users.findOne({ username: req.body.username }, function(err, existingUser) {
    if (existingUser) {
      return res.status(409).send({ message: 'Username is already taken' });
    }
    else {

        db.post_user([req.body.firstname, req.body.lastname, req.body.address, req.body.zip, req.body.username, req.body.password], function(err, users){
          db.users.findOne({username: req.body.username}, function(err, user){
            // console.log(user);
            res.send({
                      token: createJWT(user),
                      user: getSafeUser(user)
                    });
          });
        });
    }


    });
  });


function getSafeUser (user) {
  return {
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    address: user.address,
    zip: user.zip,
    admin: user.admin,
    username: user.username
    // password: user.password
    // email: user.email,
    // display_name: user.display_name,
    // follows: user.follows,
    // savedStories: user.saved_stories
  };
}





/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  ENDPOINTS
    Include ensureAuthenticated for all endpoints a person need to be logged in for
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
app.get('/api/users', ensureAuthenticated, controller.getUsers);
app.get('/api/users/:id', ensureAuthenticated, controller.getThisUser);
app.post('/api/users', controller.postUser);
app.put('/api/users/info', ensureAuthenticated, controller.updateUserInfo);
app.put('/api/users/password', ensureAuthenticated, controller.updatePassword);

app.get('/api/orders/unfilled', ensureAuthenticated, controller.getUnfilledOrders);
app.get('/api/orders/filled', ensureAuthenticated, controller.getFilledOrders);
app.get('/api/orders/:id', ensureAuthenticated, controller.getUserOrders);
app.get('/api/orders/details/:id', ensureAuthenticated, controller.getOrderDetails);
app.post('/api/orders', ensureAuthenticated, controller.placeOrder);
app.put('/api/orders/mark/filled/:id', ensureAuthenticated, controller.markOrderFilled);
app.put('/api/orders/mark/unfilled/:id', ensureAuthenticated, controller.markOrderUnfilled);

app.post('/api/payment', ensureAuthenticated, function(req, res) {
  var stripeToken = req.body.token;
  console.log('req.body', req.body);
  var charge = stripe.charges.create({
    amount: 1000, // Amount in cents
    currency: "usd",
    source: stripeToken,
    description: "Example charge"
  }).then(function(response) {
    console.log('response', response);
  });

});

app.get('/api/products', controller.getProducts); // no login required for this endpoint
app.put('/api/products/:id', ensureAuthenticated, controller.updateProducts);


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  PORT
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
// var port = config.port;
var port = process.env.PORT || config.port; // If the environment has a port (Heroku will) use it; otherwise use config.port
app.listen(port, function() {
  console.log('Listening now on port ' + port);
});


// var hash = bcrypt.hashSync(req.body.password, saltRounds);
// console.log(hash);
// req.body.password = hash
