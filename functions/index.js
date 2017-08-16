const functions = require('firebase-functions');

exports.setTimestampToFeedback = functions.database.ref('/feedback/{pushId}/feedback')
  .onWrite(event => {
    return event.data.ref.parent.child('timestamp').set(Date.now());
  })
