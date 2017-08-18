const authService = require('./authService');

module.exports = (req, res, next) => {
  const token = req.header('x-vilkensgard-token');

  const invalid = () => {
    res.status(401).json({
      error: 'Invalid token' 
    })
  }
  if (!token) {
    invalid();   
  } else {
    authService.validateToken(token)
      .then(tokenValid => tokenValid ? next() : invalid());
  }
}