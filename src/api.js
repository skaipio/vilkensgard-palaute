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

const apiUrl = process.env.NODE_ENV === 'production' ? '/api' : 'https://us-central1-vilkensgard-palaute.cloudfunctions.net/api';

const getRequestOptions = (method, headers = new Headers()) => {
  headers.append('Accept', 'application/json');
  headers.append('x-vilkensgard-environment', process.env.NODE_ENV || 'development');
  return {
    method,
    headers,
  };
}

const transform = (body) => {
  return Object.keys(body).map(key => ({
    key,
    ...body[key]
  }));
}

const api = {
  get: async (path) => {
    const response = await fetch(`${apiUrl}${path}`, getRequestOptions('GET'));
    const body = await response.json();
    return body || [];
  },
  post: async (path, data) => {
    const response = await fetch(`${apiUrl}${path}`, {
      ...getRequestOptions('POST'),
      body: JSON.stringify(data)
    });
    return response.json();
  }
}

export async function getAllFeedback() {
  const feedback = await api.get('/feedback');
  return transform(feedback).reverse();
}

export function postFeedback(feedback) {
  return api.post('/feedback', { feedback });
}

export function validateToken(token) {
  return api.get(`/validateToken?token=${token}`);
}