const { check } = require("express-validator");
const validator = require("./index.validator");

const isDateValidate = (value, { path }) => {
    const trimValue = value.trim();
    const date = new Date(trimValue)
    console.log(date, "date", typeof date);
    if (date == "Invalid Date") {
        throw new Error(`Invalid ${path}`)
    }
    return value
};
const createTeamValidator = [
    check("startDate").exists().withMessage('startDate is required').bail()
        .custom(isDateValidate),
    check("maxStartDate").exists().withMessage('maxStartDate is required').bail()
        .custom(isDateValidate),
    check("endDate").exists().withMessage('endDate is required').bail()
        .custom(isDateValidate),
    check("startDate").exists().withMessage('startDate is required').bail()
        .custom(isDateValidate),
    ...validator
]

module.exports = { createTeamValidator }