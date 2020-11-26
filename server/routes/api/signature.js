const express = require("express");
const router = express.Router();
const db = require("../../db");
const auth = require("../../middleware/auth");
const hasSigned = require("../../middleware/hasSigned");
const config = require("config");

// @route       GET api/signature
// @desc        Get user's signature --> for testing purposes, signature will be extracted from profile data
// @access      Private
router.get("/", auth, async (req, res) => {
    const id = req.user.id;

    try {
        let signature = await db.getSignature(id);

        if (signature.rows[0]) {
            signature = { ...signature.rows[0] };
            signature.updated_at = formatDate(signature.updated_at);
            return res.json({ ...signature });
        } else {
            return res.json(null);
        }
    } catch (err) {
        console.log("err in GET api/signature", err);
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
// @route       POST api/signature
// @desc        Create or update user's signature
// @access      Private
router.post("/", auth, async (req, res) => {
    const id = req.user.id;
    console.log(`user ${id} has signed`);
    const sign = req.body.signature;

    if (!sign) {
        return res.status(400).json({
            errors: [{ msg: "Sign again, please" }],
        });
    }

    try {
        let signature = await db.upsertSignature(id, sign);
        signature = { ...signature.rows[0] };
        signature.updated_at = formatDate(signature.updated_at);
        res.json({ ...signature });
    } catch (err) {
        console.log("err in POST api/signature", err);
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
// @route       DELETE api/signature
// @desc        Create or update user's signature
// @access      Private
router.delete("/", auth, async (req, res) => {
    console.log("req", req.method);
    const id = req.user.id;

    try {
        await db.deleteSignature(id);
        res.json({ success: true });
    } catch (err) {
        console.log("err in DELETE api/signature", err);
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
// @route       GET api/signature/all
// @desc        Get all signatures
// @access      Private
router.get("/all", auth, hasSigned, async (req, res) => {
    try {
        const result = await db.getSigners();
        console.log("example", result.rows);

        res.json(result.rows);
    } catch (err) {
        console.log(err);
    }
});

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
