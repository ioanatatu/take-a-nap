const express = require("express");
const router = express.Router();
const db = require("../../db");
const auth = require("../../middleware/auth");
const config = require("config");
const {
    profileValidator,
    profileValidationResult,
} = require("../../validators/profileValidation");

// @route       GET api/profile
// @desc        Get current users profile
// @access      Private
router.get("/", auth, async (req, res) => {
    console.log(req.user.id);
    try {
        const id = req.user.id;

        let [profile, user, signature] = await Promise.all([
            db.getUserProfile(id),
            db.getUser(id),
            db.getSignature(id),
        ]);

        user = user.rows[0];
        signature = signature.rows[0] || { signature: null };

        // format date
        if (profile.rows[0] != null) {
            profile = profile.rows[0];
            profile.updated_at = formatDate(profile.updated_at);
        } else {
            profile = { profile: null };
        }

        res.json({ ...profile, ...user, ...signature });
    } catch (err) {
        console.log("err in GET api/profile/me", err);
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
 */
// @route       POST api/profile
// @desc        Create or update a user's profile
// @access      Private
router.post(
    "/",
    auth,
    profileValidator,
    profileValidationResult,
    async (req, res) => {
        console.log(req.body);

        let user = req.user.id;
        let age = req.body.age == "" ? null : req.body.age;
        let city = req.body.city.trim() == "" ? null : req.body.city.trim();
        let pet = req.body.pet.trim() == "" ? null : req.body.pet.trim();
        let url = req.body.url.trim();

        if (
            url !== "" &&
            !(url.startsWith("http://") || url.startsWith("https://"))
        ) {
            url = `https://${url}`;
        }

        try {
            const result = await db.updateUserProfile(
                user,
                age,
                city,
                pet,
                url
            );

            // format date
            const date = formatDate(result.rows[0].updated_at);

            res.json({
                user: user,
                age: age,
                city: city,
                pet: pet,
                url: url,
                updated_at: date,
            });
        } catch (err) {
            console.log("err in POST api/profile", err);
            res.status(500).send("Server error");
        }
    }
);

module.exports = router;
/*
 *
 *
 *
 *
 *
 * helper functions
 */
const formatDate = (date) => {
    const formatter = new Intl.DateTimeFormat("de", { month: "long" });
    const month = formatter.format(new Date(date));

    return `${date.getDate()} ${month} ${date.getFullYear()}`;
};
