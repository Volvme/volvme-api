const express = require('express');
const router = express.Router();

//import rooutes
const userRoutes = require('./user');
const clientRoutes = require('./volumeClient');
//mount routes
router.use('/user', userRoutes);
router.use('/volumeClient', clientRoutes);


module.exports = router;
