const { check } = require("express-validator");
const validator = require("./index.validator");

const hasNoWhitespace = (value, { path }) => {
  const trimValue = value.trim();
  if (!trimValue.length) {
    throw new Error(`Invalid ${path}: Whitespace is not allowed.`);
  }
  return value;
};


const submitHackathon = [
  check("title").exists().withMessage('title is required').bail()
    .isString().withMessage('Invalid title').bail()
    .isLength({ min: 1 }).withMessage("Invalid title").bail()
    .custom(hasNoWhitespace),

  check("teamId").exists().withMessage('team id is required').bail()
    .isString().withMessage('Invalid team id').bail()
    .isLength({ min: 1 }).withMessage("Invalid team id").bail()
    .custom(hasNoWhitespace),

  ...validator
]


module.exports = { submitHackathon }