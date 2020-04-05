import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAOJzYfk0IYdG_2yGSq1LpCOLXoWRHmg9Q',
  authDomain: 'kabuker.firebaseapp.com',
  databaseURL: 'https://kabuker.firebaseio.com',
  projectId: 'kabuker',
  storageBucket: 'kabuker.appspot.com',
  messagingSenderId: '641024804633',
  appId: '1:641024804633:web:62ee9e2614caef50822788',
};

export default (context, inject) => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
  inject('firebase', firebase);
};
