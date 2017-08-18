const whitelist = ['http://localhost:3000', 'https://vilkensgard-palaute.firebaseapp.com'];

const corsHandler = (req, callback) => {
  if (!req.header('Origin')) {
    callback(null, { origin: false });
  } else if (whitelist.indexOf(req.header('Origin')) !== -1) {
    callback(null, { origin: true });
  } else{
    callback({ error: 'cors' });
  } 
};

module.exports = {
  corsOptions: corsHandler
};