const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../models/user-model.js');
const restricted = require('./authenticate-middleware.js');
const secrets = require('./secrets.js')


router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.register(user)
    .then(registered => {
      res.status(201).json(registered);
    })
    .catch(error => {
      res.status(500).json({error: "register failed"});
    })
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
