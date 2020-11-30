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

////////////// update this with the more secure verson //////////////
var serviceAccount =
    JSON.parse(process.env.fbAdmin) ||
    require("/mnt/c/Users/petit/Desktop/take-a-nap-petition/server/firebase/take-a-nap-56da1-firebase-adminsdk-i557h-0d9c0f7c6f.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://take-a-nap-56da1.firebaseio.com",
});
////////////////////////////////////////////////////////////////////
const db = admin.database();

// Send email
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

// Encrypt email
const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotalySecretKey");

// Require SendGrid API key
const secret = require("../../secrets.json");

// transporter configuration
const transporter = nodemailer.createTransport(
    sendgridTransport({
        auth: {
            api_key: process.env.emailSecret || secret.emailSecret,
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
    email = "tatu.ioana@gmail.com";

    const encryptedEmail = cryptr.encrypt(email);
    console.log(encryptedEmail);

    const subject = exists
        ? "you are already signed up"
        : "welcome to my newsletter";
    const message = exists
        ? `<h1>test TRUE</h1><p>user already exists</p><div><a href=\"http://localhost:3002/api/subscribe/unsubscribe/${encryptedEmail}\">unsubscribe</a></div>`
        : `<h1>test FALSE</h1><p>user does not exist</p><div><a href=\"http://localhost:3002/api/subscribe/unsubscribe/${encryptedEmail}\">unsubscribe</a></div>`;

    try {
        const result = await transporter.sendMail({
            to: email,
            from: "tatu.ioana@gmail.com",
            subject: subject,
            html: message,
        });
        console.log("email has been sent");
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
    console.log(req.referer);
    console.log(req.params);
    console.log(req.body);
    console.log(req.path);
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
        ////// REDIRECT TO A PAGE IN MY REACT //////////
        return res.json({ success: dt });
    } catch (err) {
        console.log(err);
        return res.json({ success: false });
    }
});

module.exports = router;
