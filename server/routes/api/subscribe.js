const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

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
            api_key: secret.emailSecret,
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
    console.log(req.params);
    const { hash } = req.params;

    try {
        const decryptedEmail = await cryptr.decrypt(hash);
        return res.json({ success: decryptedEmail });
    } catch (err) {
        console.log(err);
        return res.json({ success: false });
    }
});

module.exports = router;
