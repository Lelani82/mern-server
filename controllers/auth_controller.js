const passport = require("passport");
const User = require("../models/user");

// Controller for routes to do with user authentication. Requires the User model, and uses the passport dependency

// function to register a user.
const register = function (req, res) {
  User.register(new User({
      username: req.body.username,
      email: req.body.email,
      role: req.body.role || 'user'
  }), req.body.password, function (err) {
      if (err) {
          console.log(err)
          if(err.name === 'UserExistsError') {
              res.status(409)
              res.json({
                  error: err.message
              });
          } else {
              res.status(500);
              res.json({
                  error: err
              });
          }
      } else {
          // Log in the newly registered user
          loginUser(req, res);
      }
  });
};

// function to log in user
function loginUser(req, res) {
    // authenticate is a helper function from passport that authenticates the user
    authenticate(req, res, function () {
        console.log('authenticated', req.user.username);
        console.log('session object:', req.session);
        console.log('req.user:', req.user);
        res.status(200);
        res.json(req.user);
    });
};

// function to log out the user
const logout = function (req, res) {
    req.logout();
    console.log("logged out user");
    console.log("session object:", req.session);
    console.log("req.user:", req.user);
    res.sendStatus(200);
}

// helper functions
const authenticate = passport.authenticate('local');

// function checks has a valid session id
const activeUserSession = (req,res) => {
    if(req.sessionID && req.user) {
        res.status(200);
        res.send(req.sessionID)
    }
    else {
        res.sendStatus(403);
    }
}

module.exports = {
    register,
    login: loginUser,
    logout,
    activeUserSession
};