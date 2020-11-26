const { check, validationResult } = require("express-validator");

exports.profileValidationResult = (req, res, next) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        const error = result.array()[0].msg;
        console.log("msg", result.array()[0].msg);

        return res.status(400).json({
            errors: result.array(),
        });
    }
    next();
};

exports.profileValidator = [
    // check("age")
    //     .trim()
    //     .custom((age) => {
    //         return age > 5 && age < 150;
    //     })
    //     .withMessage(
    //         "If you're more than 150 years, you should be in the Guinness Book"
    //     ),
    // check("city")
    //     .isString()
    //     .withMessage("City should be a word")
    //     .isLength({ min: 2, max: 20 }),
    check("url").custom((url) => {
        if (url !== "") {
            const regEx = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
            if (!regEx.test(url)) throw new Error("Please enter a valid url");
            return true;
        }
        return true;
    }),
];
