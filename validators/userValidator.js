const { check } = require("express-validator");

exports.signupValidator = [
  check("firstname").not().isEmpty().withMessage("First name is required"),
  check("lastname").not().isEmpty().withMessage("Last name is required"),
  check("email").isEmail().withMessage("Email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 characters long"),
];

exports.signinValidator = [
  check("email").isEmail().withMessage("Email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 characters long"),
];
