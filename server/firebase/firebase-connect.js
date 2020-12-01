const firebase = require("firebase");

// uncomment for heroku deployment
// const secret = process.env.fbSecret || require("../secrets.json").fbSecret;
// comment out for heroku deploy.
const secret = require("../secrets.json").fbSecret;

const app = firebase.initializeApp({
    apiKey: secret,
    authDomain: "take-a-nap-56da1.firebaseapp.com",
    databaseURL: "https://PROJECT_ID.firebaseio.com",
    storageBucket: "take-a-nap-56da1.appspot.com",
});

module.exports = app;
