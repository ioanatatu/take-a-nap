const deploying = require("../../config/deploying");

const firebase = require("firebase");

const secret = deploying
    ? process.env.FIREBASE_SECRET
    : require("../secrets.json").FIREBASE_SECRET;

/* uncomment for heroku deployment */
// const secret = process.env.FIREBASE_SECRET;
/* comment out for heroku deploy */
// const secret = require("../secrets.json").FIREBASE_SECRET;

const app = firebase.initializeApp({
    apiKey: secret,
    authDomain: "take-a-nap-56da1.firebaseapp.com",
    databaseURL: "https://PROJECT_ID.firebaseio.com",
    storageBucket: "take-a-nap-56da1.appspot.com",
});

module.exports = app;
