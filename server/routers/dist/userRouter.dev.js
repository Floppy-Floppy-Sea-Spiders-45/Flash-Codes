"use strict";

var express = require('express');

var userController = require('../controllers/userController');

var router = express.Router(); // post request to create user

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
module.exports = router;