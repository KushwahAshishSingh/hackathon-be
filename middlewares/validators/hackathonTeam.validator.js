const { check } = require("express-validator");
const validator = require("./index.validator");

const hasNoWhitespace = (value, { path }) => {
  const trimValue = value.trim();
  if (!trimValue.length) {
    throw new Error(`Invalid ${path}: Whitespace is not allowed.`);
  }
  return value;
};


const createTeamValidator = [
  check("userId").exists().withMessage('userid is required').bail()
    .isString().withMessage('Invalid userid').bail()
    .isLength({ min: 1 }).withMessage("Invalid userid").bail()
    .custom(hasNoWhitespace),

  check("name").exists().withMessage('name is required').bail()
    .isString().withMessage('Invalid name').bail()
    .isLength({ min: 1 }).withMessage("Invalid name").bail()
    .custom(hasNoWhitespace),
  // check("email")
  //   .exists().withMessage('email is required').bail()
  //   .isEmail().withMessage('Invalid email')
  //   .custom(hasNoWhitespace),
  // check("password")
  //   .exists().withMessage('password is required').bail()
  //   .isString().withMessage('Invalid password')
  //   .custom(hasNoWhitespace),
  ...validator
]

const addUserTeamValidator = [
  check("userId").exists().withMessage('userid is required').bail()
    .isString().withMessage('Invalid userid').bail()
    .isLength({ min: 1 }).withMessage("Invalid userid").bail()
    .custom(hasNoWhitespace),

  check("teamId").exists().withMessage('teamId is required').bail()
    .isString().withMessage('Invalid teamId').bail()
    .isLength({ min: 1 }).withMessage("Invalid teamId").bail()
    .custom(hasNoWhitespace),
  // check("email")
  //   .exists().withMessage('email is required').bail()
  //   .isEmail().withMessage('Invalid email')
  //   .custom(hasNoWhitespace),
  // check("password")
  //   .exists().withMessage('password is required').bail()
  //   .isString().withMessage('Invalid password')
  //   .custom(hasNoWhitespace),
  ...validator
]


module.exports = { createTeamValidator, addUserTeamValidator }