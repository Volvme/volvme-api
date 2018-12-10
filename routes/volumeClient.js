const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/profileInfo', function(req, res) {
  res.send('respond with a resource');
});

module.exports = router;