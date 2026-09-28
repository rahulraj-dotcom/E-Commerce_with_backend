import { body, param, validationResult } from "express-validator";

export const createProductValidator = [
  body("title")
    .exists()
    .withMessage("Title is required")
    .bail()
    .isString()
    .withMessage("Title must be a string")
    .bail()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Title length must be between 2 to 100 characters"),
  body("description")
    .exists()
    .withMessage("Description is required")
    .bail()
    .isString()
    .withMessage("Description must be a string")
    .bail()
    .trim()
    .isLength({ min: 20, max: 250 })
    .withMessage("Description length must be between 20 to 250 characters"),
  body("price")
    .exists()
    .withMessage("Price is required")
    .bail()
    .isNumeric()
    .withMessage("Price must be a number"),
  (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({
        message: "Error in request",
        error: error.array(),
      });
    }

    next();
  },
];

export const updateProductValidator = [
  body("title")
    .exists()
    .withMessage("Title is required")
    .bail()
    .isString()
    .withMessage("Title must be a string")
    .bail()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Title length must be between 2 to 100 characters"),

  body("description")
    .exists()
    .withMessage("Description is required")
    .bail()
    .isString()
    .withMessage("Description must be a string")
    .bail()
    .trim()
    .isLength({ min: 20, max: 250 })
    .withMessage("Description length must be between 20 to 250 characters"),

  body("price")
    .exists()
    .withMessage("Price is required")
    .bail()
    .isNumeric()
    .withMessage("Price must be a number"),

  (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({
        message: "Error in request",
        error: error.array(),
      });
    }

    next();
  },
];

export const productIdValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid product ID"),

  (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({
        message: "Error in request",
        error: error.array(),
      });
    }

    next();
  },
];