const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

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
    // const email = req.body.email;
    const email = "tatu.ioana@gmail.com";

    try {
        const result = await transporter.sendMail({
            to: email,
            from: "tatu.ioana@gmail.com",
            subject: "signup successful",
            html: "<h1>signed up TEST</h1>",
        });
        console.log("email has been sent");
        return res.send(result);
    } catch (err) {
        console.log("err", err);
    }
});

/*     [
    check("email")
        .normalizeEmail()
        .trim()
        .not()
        .isEmpty()
        .isEmail()
        .withMessage("Please enter a valid email"),
],
 */
module.exports = router;
