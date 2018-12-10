const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../Models/User');

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

module.exports = router;
