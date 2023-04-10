// const adminAndroid = require('firebase-admin');
// const serviceAccount = require('./kdt-team-firebase-adminsdk-yb307-1d87de7048.json');
const express = require('express');
const firebase = require('firebase/app');

const messaging = require('firebase/messaging');

const router = express.Router();

const { APP_ADMIN_KEY } = process.env;

firebase.initializeApp({
  apiKey: 'AIzaSyCNi_eWd5kP4JY_CAS1vAnFvI_svAybPAM',
  authDomain: 'kdt-team.firebaseapp.com',
  projectId: 'kdt-team',
  storageBucket: 'kdt-team.appspot.com',
  messagingSenderId: '456348981776',
  appId: '1:456348981776:web:f1d7fbea63fd8f5326c895',
  measurementId: 'G-K43MWCXKL4',
});

// const firebaseConfig = {
//   apiKey: 'AIzaSyCNi_eWd5kP4JY_CAS1vAnFvI_svAybPAM',
//   authDomain: 'kdt-team.firebaseapp.com',
//   projectId: 'kdt-team',
//   storageBucket: 'kdt-team.appspot.com',
//   messagingSenderId: '456348981776',
//   appId: '1:456348981776:web:f1d7fbea63fd8f5326c895',
//   measurementId: 'G-K43MWCXKL4',
// };

router.get('/', async (req, res) => {
  try {
    const tokenData = await messaging;

    res.status(200).json({ tokenData });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
