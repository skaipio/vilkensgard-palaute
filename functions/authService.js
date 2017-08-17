const admin = require('firebase-admin');

module.exports = {
  validateToken: (tokenToValidate) => {
    return admin.database().ref('/token').once('value')
      .then(snapshot => snapshot.val())
      .then(token => tokenToValidate === token);
  }
}