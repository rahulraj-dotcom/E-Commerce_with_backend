import { body, validationResult } from "express-validator";

export const registerValidator = [
  body("name")
    .exists().withMessage("Name is required").bail()
    .isString().withMessage("Name must be a string")
    .trim()
    .isLength({ min: 2, max: 50 }).withMessage("Name length must be between 2 to 50 character"),
  body("email")
    .exists().withMessage("Email is required").bail()
    .trim().isEmail().withMessage("Enter a valid email address"),
  body("password")
    .exists().withMessage("Password is required").bail()
    .isString().withMessage("Password must be a string").bail()
    .trim()
    .isLength({min:6}).withMessage("Password must be minimum 6 characters long"),
    body("confirmPassword")
    .exists().withMessage("Confirm password is required").bail()
    .isString().withMessage("Confirm password must be a string").bail()
    .custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }

    return true;
  }),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid request",
        errors: errors.array(),
      });
    }

    next()
  },
];

export const loginValidator = [
  body("email")
    .exists().withMessage("Email is required").bail()
    .trim().isEmail().withMessage("Enter a valid email address"),
  body("password")
    .exists().withMessage("Password is required").bail()
    .isString().withMessage("Password must be a string").bail()
    .trim()
    .isLength({min:6}).withMessage("Password must be minimum 6 characters long"),
    (req, res, next) => {
      const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid request",
        errors: errors.array(),
      });
    }

    next()
  },
]
