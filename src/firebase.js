import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDQ-39hHLLpNmWfZmBk9rMAGoKXGEx2qPE',
  authDomain: 'confusion-oa-187609.firebaseapp.com',
  databaseURL: 'https://confusion-oa-187609.firebaseio.com',
  projectId: 'confusion-oa-187609',
  storageBucket: 'confusion-oa-187609.appspot.com',
  messagingSenderId: '597760573164',
};

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseArticles = firebaseDB.ref('articles');
const firebaseTeams = firebaseDB.ref('teams');
const firebaseVideos = firebaseDB.ref('videos');

const firebaseLooper = snapshot => {
  const data = [];
  snapshot.forEach(childSnapshot => {
    data.push({
      ...childSnapshot.val(),
      id: childSnapshot.key,
    });
  });
  return data;
};

export {
  firebase,
  firebaseDB,
  firebaseArticles,
  firebaseTeams,
  firebaseVideos,
  firebaseLooper
};
