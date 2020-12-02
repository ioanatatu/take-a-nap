const { check, validationResult, body } = require("express-validator");

exports.userValidationResult = (req, res, next) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        const error = result.array()[0].msg;
        console.log(result.array()[0].msg);

        return res.status(400).json({
            errors: result.array(),
        });
    }
    next();
};

exports.userValidator = [
    check(
        "first",
        "First name is required and must be at least 2 characters long"
    )
        .trim()
        .not()
        .isEmpty()
        .withMessage("First name is required")
        .isLength({ min: 2, max: 20 })
        .withMessage("First name must have at least 2 characters"),
    check("last")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Last name is required")
        .isLength({ min: 2, max: 20 })
        .withMessage("Last name must have at least 2 characters"),
    check("email")
        .trim()
        .not()
        .isEmpty()
        .withMessage(" ")
        .isEmail()
        .withMessage("Please enter a valid email"),
    check("password")
        .trim()
        .not()
        .isEmpty()
        .withMessage(" ")
        .isLength({ min: 7 })
        .withMessage(
            "Password must contain at least 7 characters, one uppercase letter, one number and one special character"
        )
        .custom((password) => {
            const regEx = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
            if (!regEx.test(password)) throw new Error(" ");
            return true;
        }),
    body("password2").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Password confirmation does not match password");
        }
        return true;
    }),
];

exports.userLoginValidator = [
    check("email")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please enter a valid email"),
    check("password", "Password is required").exists(),
];
