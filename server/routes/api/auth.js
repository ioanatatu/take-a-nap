const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const db = require("../../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const {
    userLoginValidator,
    userValidationResult,
} = require("../../validators/userValidation");
/*
 *
 *
 *
 *
 *
 *
 * this route wil always be hit for user validation
 */
// @route   GET api/auth
// @desc    Test route
// @access  Private
router.get("/", auth, async (req, res) => {
    console.log("req.user", req.user.id);

    try {
        const user = await db.getUser(req.user.id);
        console.log(user.rows);
        res.json(user.rows[0]);
    } catch (err) {
        console.log("err from GET api/auth", err);
    }
});
/*
 *
 *
 *
 *
 *
 *
 *
 */
// @route   POST api/auth
// @desc    Authenticate user and get token
//          The purpose of this file is to get the token so the user can make requests to public routes
// @access  Public
router.post("/", userLoginValidator, userValidationResult, async (req, res) => {
    const { email, password } = req.body;

    try {
        let result = await db.getLoginUser(email);
        console.log(result.rows);

        if (!result.rows[0]) {
            return res.status(422).json({
                // email doesn't exits in the db, but we just show a general invalid credentials message
                errors: [
                    {
                        msg: "Invalid Credentials. Try again.",
                        param: "email",
                    },
                ],
            });
        }

        const isMatch = await bcrypt.compare(password, result.rows[0].pass);

        if (!isMatch) {
            console.log("password does not match");
            return res.status(400).json({
                // password doesnt match, but we just show a general invalid credentials message
                errors: [
                    {
                        msg:
                            "Either email or password are incorrect. Try again.",
                        param: "email",
                    },
                ],
            });
        }

        const payload = {
            user: { id: result.rows[0].id },
        };

        jwt.sign(
            payload,
            config.get("jwtSecret"),
            { expiresIn: 360000 },
            async (err, token) => {
                if (err) {
                    throw err;
                }
                console.log(token);
                res.json({ token });
            }
        );
    } catch (err) {
        console.log("error from auth > insert into db", err.message);
        res.status(500).send("Server error");
    }
});
/*
 *
 *
 *
 *
 *
 *
 *
 */
// @route   DELETE api/auth
// @desc    Authenticate user and get token
//          The purpose of this file is to get the token so the user can make requests to public routes
// @access  Private
router.delete("/", auth, async (req, res) => {
    try {
        await db.deleteUser(req.user.id);
        res.json({ accountDeleted: true });
    } catch (err) {
        console.log("err from DELETE api/auth", err);
        res.json({ accountDeleted: false });
    }
});

module.exports = router;
