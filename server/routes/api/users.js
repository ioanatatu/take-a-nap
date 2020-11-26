const express = require("express");
const router = express.Router();
const db = require("../../db");
const { hash, compare } = require("../../bc");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");
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
                    console.log(result.rows[0].id);

                    const payload = {
                        user: { id: result.rows[0].id },
                    };

                    jwt.sign(
                        payload,
                        config.get("jwtSecret"),
                        { expiresIn: "1h" },
                        async (err, token) => {
                            if (err) {
                                throw err;
                            }
                            res.json({ token });
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
/*
 *
 *
 *
 */
// @route   DELETE  api/users ---> WIP: I might not need this
// @desc    Delete user
// @access  Private
router.delete("/", auth, async (req, res) => {
    const id = req.user.id;

    Promise.all([
        db.deleteSignature(id),
        db.deleteProfile(id),
        db.deleteUser(id),
    ])
        .then(() => {
            console.log(`user ${id} deleted account`);
            res.json({ accountDeleted: true });
        })
        .catch((e) => {
            console.log("error", e);
            res.json({ accountDeleted: false });
        });
});

module.exports = router;
