const admin = require('firebase-admin');
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');

admin.initializeApp(functions.config().firebase);

const app = express();
const feedbackController = require('./feedbackController');
const authController = require('./authController');

const whitelist = ['http://localhost:3000', 'https://vilkensgard-palaute.firebaseapp.com'];

const corsDelegate = (req, callback) => {
  if (!req.header('Origin')) {
    callback(null,  { origin: false });
  } else if (whitelist.indexOf(req.header('Origin')) !== -1) {
    callback(null, { origin: true });
  } else{
    callback({ error: 'cors' });
  } 
};

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} from ${req.header('Origin')}`);
  next();
});

app.use('*', cors(corsDelegate));
app.options('*', cors(corsDelegate));

app.use('(/api)?/feedback', feedbackController);
app.use('(/api)?/validateToken', authController);

app.use((err, req, res, next) => {
  if (err.error === 'cors') {
    console.error(err.stack);
    res.status(401).json({ error: 'Not authorized' });
  } else {
    next(err);
  } 
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json( { error: 'Unknown' });
});

exports.api = functions.https.onRequest(app);