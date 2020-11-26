const db = require("../db");

module.exports = async (req, res, next) => {
    const id = req.user.id;

    try {
        const hasSigned = await db.getSignature(id);
        console.log(hasSigned.rows);

        if (hasSigned.rows[0] != null) {
            next();
        } else {
            return res.status(403).json({
                errors: [{ msg: "User must sign first to see all signers" }],
            });
        }
    } catch (err) {
        console.log(err);
    }
};
