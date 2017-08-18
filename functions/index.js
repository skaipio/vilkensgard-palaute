const admin = require('firebase-admin');
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const config = require('./config');

admin.initializeApp(functions.config().firebase);

const app = express();
const feedbackController = require('./feedbackController');
const authMiddleware = require('./authMiddleware');

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} from ${req.header('Origin')}`);
  next();
});

app.use('*', cors(config.corsOptions));
app.options('*', cors(config.corsOptions));
app.use(authMiddleware);

app.use('(/api)?/feedback', feedbackController);

app.use((err, req, res, next) => {
  if (err.error === 'cors') {
    console.error(err.stack);
    res.status(401).json({ error: 'Not authorized' });
  } else {
    next(err);
  } 
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json( { error: 'Unknown' });
});

exports.api = functions.https.onRequest(app);