const router = require('express').Router();
const mongoose = require('mongoose');

// Get an instance of the model.
const UserModel = require('../models/userModel');

router.get('/', (req, res) => {
  res.send("This is the userRoutes");
});


module.exports = router;
