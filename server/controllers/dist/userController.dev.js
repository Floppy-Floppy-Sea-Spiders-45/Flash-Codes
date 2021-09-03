"use strict";

var bcrypt = require('bcrypt');

var saltRounds = 8;

var axios = require('axios');

require('dotenv').config(); // import uuid module to generate unique user ids


var _require = require('uuid'),
    uuidv4 = _require.v4; // import db


var db = require('../db/db'); // create object to hold userController methods (middleware) 


var userController = {}; // Only creates entry in User table

userController.createUser = function (req, res, next) {
  if (res.locals.userExists) {
    return next();
  } // deconstruct req.body to get username, password


  if (res.locals.username && res.locals.userID) {
    req.body.username = res.locals.username;
    req.body.password = res.locals.userID;
  }

  var username = req.body.username;
  var password = req.body.password;
  bcrypt.hash(password, saltRounds).then(function (encryptedPassword) {
    console.log('encrypted password:', encryptedPassword); // generate _id using uuid

    var id = uuidv4();
    console.log('uuid: ', id); // create sql query to INSERT new user INTO the psql db

    var query = "\n    INSERT INTO users (_id, username, password)\n    SELECT $1, $2, $3;\n    ";
    db.query(query, [id, username, encryptedPassword]).then(function (response) {
      res.locals.userID = id;
      return next();
    })["catch"](function (error) {
      console.log('ERROR in createUser: ', error);
      return next({
        log: error,
        message: {
          err: 'Error accessing database for user'
        }
      });
    });
  })["catch"](function (error) {
    console.log('ERROR in bcrypt: ', error);
    return next({
      log: error,
      message: {
        err: 'Error accessing database for user'
      }
    });
  }); // query db to insert new user into db
  // return next if query is successful
  // return next(error obj) if query fails
};

userController.checkOauthExists = function (req, res, next) {
  var username = res.locals.username;
  var query = "SELECT * FROM users WHERE username=$1;"; // if user is found, return an error. If query error, continue next

  db.query(query, [username]).then(function (response) {
    if (response.rows.length === 0) {
      res.locals.userExists = false;
      return next();
    }

    res.locals.userExists = true; // return res.status(200).send(res.locals.user);

    return next();
  });
};

userController.checkUserExists = function (req, res, next) {
  var username = req.body.username;
  var query = "SELECT * FROM users WHERE username=$1;"; // if user is found, return an error. If query error, continue next

  db.query(query, [username]).then(function (response) {
    if (response.rows.length === 0) {
      res.locals.userExists = false;
      return next();
    }

    res.locals.userExists = true; // return res.status(200).send(res.locals.user);

    return next();
  });
}; // checks for matching entry in user table


userController.verifyUser = function _callee(req, res, next) {
  var username, password, query, user, comparison;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (res.locals.username && res.locals.userID) {
            req.body.username = res.locals.username;
            req.body.password = res.locals.userID;
          } // deconstruct req.body to get username input and password input


          username = req.body.username;
          password = req.body.password; // console.log(encryptedPassword)

          query = "\n          SELECT *\n          FROM users\n          WHERE username=$1;\n          "; // query db to find username and password combo

          _context.prev = 4;
          _context.next = 7;
          return regeneratorRuntime.awrap(db.query(query, [username]));

        case 7:
          user = _context.sent;
          _context.next = 10;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.rows[0].password));

        case 10:
          comparison = _context.sent;
          console.log(comparison);

          if (!comparison) {
            _context.next = 16;
            break;
          }

          res.locals.password = user.rows[0].password;
          res.locals.userID = user.rows[0]._id;
          return _context.abrupt("return", next());

        case 16:
          _context.next = 21;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](4);
          return _context.abrupt("return", next({
            log: _context.t0,
            message: _context.t0
          }));

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 18]]);
};

var clientID = process.env.CLIENT_ID;
var clientSecret = process.env.CLIENT_SECRET;

userController.oauthUser = function _callee2(req, res, next) {
  var requestToken, response, accessTokenArr, accessToken;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log('make it to oauth redirect route');
          requestToken = req.query.code;
          console.log('request token : ', requestToken);
          _context2.prev = 3;
          _context2.next = 6;
          return regeneratorRuntime.awrap(axios.post("https://github.com/login/oauth/access_token?client_id=".concat(clientID, "&client_secret=").concat(clientSecret, "&code=").concat(requestToken)));

        case 6:
          response = _context2.sent;
          // console.log('response: ', response.data);
          accessTokenArr = response.data.split(/[ &]+/);
          accessToken = accessTokenArr[0].substring(13);
          console.log('accessToken: ', accessToken);
          res.locals.token = accessToken;
          console.log('finished it!');
          return _context2.abrupt("return", next());

        case 15:
          _context2.prev = 15;
          _context2.t0 = _context2["catch"](3);
          console.log('error in oauthUser', _context2.t0);

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 15]]);
};

userController.fetchUser = function _callee3(req, res, next) {
  var response;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          console.log('Made it to fetchUser');
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(axios.get('https://api.github.com/user', {
            headers: {
              // This header informs the Github API about the API version
              // Include the token in the Authorization header
              Authorization: "token " + res.locals.token
            }
          }));

        case 4:
          response = _context3.sent;
          console.log(response.data);
          console.log('login: ', response.data.login);
          console.log('node id: ', response.data.node_id);
          res.locals.gitID = response.data.node_id;
          res.locals.userID = response.data.node_id;
          res.locals.username = response.data.login;
          return _context3.abrupt("return", next());

        case 14:
          _context3.prev = 14;
          _context3.t0 = _context3["catch"](1);
          console.log('Error found!', _context3.t0);

        case 17:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 14]]);
};

module.exports = userController;