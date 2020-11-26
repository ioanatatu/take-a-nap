const express = require("express");
const router = express.Router();
const db = require("../../db");
const { hash, compare } = require("../../bc");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const config = require("config");
const {
    userValidator,
    userValidationResult,
} = require("../../validators/userValidation");

// @route   POST  api/users
// @desc    Register user
// @access  Public
router.post("/", userValidator, userValidationResult, (req, res) => {
    const { first, last, email, password } = req.body;

    hash(password)
        .then((hashedPassword) => {
            const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });

            db.addUser(first, last, email, hashedPassword, avatar)
                .then((result) => {
                    const userId = result.rows[0].id;
                    console.log(userId);

                    const payload = {
                        user: { id: userId },
                    };

                    jwt.sign(
                        payload,
                        config.get("jwtSecret"),
                        //////////////////////////////////////////////// before I deploy, change this is 3600 !!!!
                        { expiresIn: 360000 },
                        async (err, token) => {
                            if (err) {
                                throw err;
                            }
                            res.json({
                                token,
                            });
                        }
                    );
                })
                .catch((e) => {
                    console.log("error from addUser", e.code, e.detail);
                    if (e.code == "23505") {
                        // email already exists
                        res.status(422).json({
                            errors: [
                                { msg: "Invalid email. Try a different one" },
                            ],
                        });
                    }
                });
        })
        .catch((e) => {
            console.log("error from hash password", e);
        });
});

module.exports = router;
