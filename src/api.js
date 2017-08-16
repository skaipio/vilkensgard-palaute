import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID
});

const database = firebase.database(firebaseApp);

const getRef = (ref) => {
  const fullRef = process.env.NODE_ENV === 'production' ? ref : `/dev${ref}`
  return database.ref(fullRef);
}

export async function getAllFeedback() {
  const snapshot = await getRef('/feedback').once('value');
  const data = snapshot.val();
  if (!data) {
    return [];
  }
  return Object.keys(data).map(key => ({
    key,
    ...data[key]
  })).reverse();
}

export async function postFeedback(feedback) {
  return await getRef('/feedback').push({feedback})
}