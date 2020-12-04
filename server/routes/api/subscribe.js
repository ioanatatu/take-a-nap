const deploying = require("../../../config/deploying");

const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

// uuid package for universally unique identifier
const { v4: uid } = require("uuid");

// Firebase
const fb = require("../../firebase/setData");
const admin = require("firebase-admin");
// const fb = require("../../firebase/firebase-connect");
// const db = fb.database();

const serviceAccount = deploying
    ? JSON.parse(process.env.FIREBASE_ADMIN)
    : require("/mnt/c/Users/petit/Desktop/take-a-nap-petition/server/firebase/take-a-nap-56da1-firebase-adminsdk-i557h-0d9c0f7c6f.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://take-a-nap-56da1.firebaseio.com",
});

const db = admin.database();

// Send email
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

// Encrypt email
const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotalySecretKey");

// Require SendGrid API key
const secret =
    process.env.EMAIL_SECRET || require("../../secrets.json").EMAIL_SECRET;

// transporter configuration
const transporter = nodemailer.createTransport(
    sendgridTransport({
        auth: {
            api_key: secret,
        },
    })
);

// @route   POST  api/subscribe
// @desc    Subscribe to emailing list
// @access  Public
router.post("/", async (req, res) => {
    console.log(secret.emailSecret);
    console.log(req.body);
    let { email, exists } = req.body;
    // email = "tatu.ioana@gmail.com";

    if (email === "test@testsson.com") {
        return res.send({ message: "test email address used" });
    }

    const encryptedEmail = cryptr.encrypt(email);
    console.log(encryptedEmail);

    const unsubscribeLink = deploying
        ? "https://rocky-brook-13518.herokuapp.com/api/subscribe/unsubscribe/"
        : "http://localhost:4000/api/subscribe/unsubscribe/";

    const subject = exists
        ? "💤 you are already signed up"
        : "🚩 Welcome to my newsletter";
    const message = exists
        ? `<p>WEEK 0 - after deploy</p><h2>Hey, you are receiving this because you tried to subscribe to my newsletter, but you are already signed up.</h2><p>You will receive one weekely update containing the features I am implementing.</p><p>Stay tuned!</p><div><a href=\"${unsubscribeLink}${encryptedEmail}\">unsubscribe</a></div>`
        : `<p>WEEK 0 - after deploy</p></p><h2>Hey, thanks for subscribing to my newsletter!</h2><p>You will receive one weekely update containing the features I am implementing.</p><p>Stay tuned!</p><div><a href=\"${unsubscribeLink}${encryptedEmail}\">unsubscribe</a></div>`;

    try {
        const result = await transporter.sendMail({
            to: email,
            from: "tatu.ioana@gmail.com",
            subject: subject,
            html: message,
        });
        console.log("email has been sent ", result);
        return res.send(result);
    } catch (err) {
        console.log("err", err);
    }
});
/*
 *
 *
 *
 *
 *
 *
 */
// @route   GET  api/subscribe/unsubscribe
// @desc    UNsubscribe from the emailing list
// @access  Public
router.get("/unsubscribe/:hash", async (req, res) => {
    console.log("req.referer ", req.referer);
    console.log("req.params ", req.params);
    console.log("req.body ", req.body);
    console.log("req.path ", req.path);
    const { hash } = req.params;

    try {
        const decryptedEmail = await cryptr.decrypt(hash);

        // only for testing
        // email will be added from client-side
        /* db.ref("/subscribers/" + uid()).set({
            email: decryptedEmail,
        }); */

        const dt = db
            .ref("/subscribers")
            .orderByChild("email")
            .equalTo(decryptedEmail)
            .once("value", function (dataSnapshot) {
                dataSnapshot.forEach(function (childSnapshot) {
                    var childKey = childSnapshot.key;
                    db.ref("/subscribers/" + childKey).set({});
                });
            });

        // return res.json({ success: decryptedEmail });
        // return res.json({ success: dt });
        // line below works
        // return res.send("<h1>you have been successfully unsubscribed</h1>");
        let linkRedirect = deploying
            ? "https://rocky-brook-13518.herokuapp.com/"
            : "http://localhost:3002/";

        res.redirect(301, linkRedirect);
        ////// how to REDIRECT TO A custom PAGE IN MY REACT ?? //////////
    } catch (err) {
        console.log(err);
        return res.send("<h1>something went wrong, try again.</h1>");
    }
});

module.exports = router;
