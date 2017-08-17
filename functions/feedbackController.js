const admin = require('firebase-admin');
const express = require('express');
const router = express.Router();

const refs = {
  production: {
    feedback: '/feedback'
  },
  development: {
    feedback: '/dev/feedback'
  }
};

const getRef = (env, path) => {
  const ref = refs[env || 'development'][path]
  return admin.database().ref(path);
};
const getEnv = (req) => req.header('X-VILKENSGARD-ENVIRONMENT');

router.get('/', (req, res) => {
  const env = getEnv(req);
  getRef(env, 'feedback').once('value')
    .then((snapshot) => res.status(200).json(snapshot.val()));
});

router.post('/', (req, res) => {
  const env = getEnv(req);
  const feedback = JSON.parse(req.body);
  feedback.timestamp = Date.now();
  return getRef(env, 'feedback').push(feedback)
    .then(result => res.status(201).json({ key: result.key }))
    .catch(error => res.status(500).json({ error }));
});

module.exports = router;