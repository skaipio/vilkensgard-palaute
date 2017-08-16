const functions = require('firebase-functions');

const setTimestamp = (event) => {
  return event.data.ref.parent.child('timestamp').set(Date.now());
}

exports.setTimestampToFeedback = functions.database.ref('/feedback/{pushId}/feedback')
  .onWrite(event => {
    return setTimeStamp(event);
  })

exports.setTimestampToFeedback = functions.database.ref('/dev/feedback/{pushId}/feedback')
  .onWrite(event => {
    return setTimestamp(event);
  })
