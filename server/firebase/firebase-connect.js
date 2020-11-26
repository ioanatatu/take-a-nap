const firebase = require("firebase");
const secret = require("../secrets.json");

const app = firebase.initializeApp({
    apiKey: secret.fbSecret,
    authDomain: "take-a-nap-56da1.firebaseapp.com",
    // authDomain: "https://take-a-nap-56da1.firebaseio.com/",
    databaseURL: "https://PROJECT_ID.firebaseio.com",
    storageBucket: "take-a-nap-56da1.appspot.com",
});

module.exports = app;
