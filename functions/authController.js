const admin = require('firebase-admin');
const express = require('express');
const router = express.Router();
const authService = require('./authService');

router.get('/', (req, res) => {
  const paramToken = req.param('token');
  if (paramToken) {
    authService.validateToken(paramToken)
      .then(tokenValid => {
        if (tokenValid) {
          res.status(200).json({ valid: true });
        } else {
          res.status(401).json({ valid: false });
        }
      })
  } else {
    res.status(401).json({ valid: false });
  }
});

module.exports = router;