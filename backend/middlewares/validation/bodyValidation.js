const { body, validationResult } = require("express-validator");
const customeError = (errors) => errors.map((e) => ({ msg: e.msg }));

module.exports.registerRules = [
  body("firstName")
    .notEmpty()
    .trim()
    .isLength({ min: 3 })
    .withMessage("first name must be more than 3 characters"),
  body("lastName")
    .notEmpty()
    .trim()
    .isLength({ min: 3 })
    .withMessage("last name must be more than 3 characters"),
  body("email")
    .isEmail()
    .normalizeEmail()
    .trim()
    .withMessage("enter a valide email adress "),
  body("pasword")
    .isLength({ min: 8 })
    .withMessage("min 8 characters"),
];
module.exports.loginRules = [
  body("email")
    .isEmail()
    .withMessage("enter a valide email adress "),
  body("pasword")

    .isLength({ min: 8 })
    .withMessage("min 8 characters"),
];

//product validators
module.exports.AddProductRules = [
  body("name")
    .notEmpty()
    .trim()
    .withMessage("Please enter product name"),
  body("price")
    .notEmpty()
    .trim()
    .withMessage("Please enter product price"),
  body("qtes")
    .notEmpty()
    .trim()
    .withMessage("please enter how many items you have in stock"),
  body("description")
    .notEmpty()
    .trim()
    .withMessage("please enter a valid description of your product"),
];

module.exports.validator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: customeError(errors.array()) });
  }
  return next();
};
