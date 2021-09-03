"use strict";

var express = require('express');

var userController = require('../controllers/userController');

var router = express.Router();

require('dotenv').config();

var clientID = process.env.CLIENT_ID;
var clientSecret = process.env.CLIENT_SECRET; // post request to create user

router.post('/createUser/', userController.checkUserExists, userController.createUser, function (req, res) {
  if (res.locals.userExists) {
    //if user exists, does not create user, responds with false
    return res.status(200).json({
      data: false
    });
  } //if user does not exist, creates user, responds with true


  return res.status(200).json({
    data: true,
    userID: res.locals.userID
  });
}); // post request to authenticate user

router.post('/authUser/', userController.verifyUser, function (req, res) {
  return res.status(200).json({
    userID: res.locals.userID
  });
});
router.get('/auth', function (req, res) {
  console.log('in /auth');
  res.redirect("https://github.com/login/oauth/authorize?client_id=".concat(clientID, "&redirect_uri=http://localhost:8080/user/oauth"));
});
router.get('/oauth', userController.oauthUser, userController.fetchUser, userController.checkOauthExists, userController.createUser, userController.verifyUser, function (req, res) {
  return res.status(200).json({
    username: res.locals.username,
    password: res.locals.gitID,
    userID: res.locals.userID
  }); // return res.redirect('/');
});
module.exports = router;