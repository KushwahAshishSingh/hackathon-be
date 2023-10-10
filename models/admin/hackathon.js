const mongoose = require("mongoose");

const typesEnums = {
    LIVE: "live",
    PRACTICE: "practice",
    ASSIGNMENT: "assignment",
    PROJECT: "project",
    TEST: "test",
}
const submissionsType = {
    TEAM: "team",
    INDIVIDUAL: "individual"
}
const questionType = {
    VIDEO: "video",
    AUDIO: "audio",
    TEXT: "text",
}

const question = new mongoose.Schema({
    question: {
        type: String,
    },
    questionType: {
        type: String,
        enum: Object.values[questionType.VIDEO, questionType.AUDIO, questionType.TEXT],
    },
    instruction: {
        type: String,
    },
    outOf: {
        type: Number,
        default: 100
    }
});

const hackathonSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        hackathonType: {
            type: String,
            enum: [typesEnums.ASSIGNMENT, typesEnums.PROJECT, typesEnums.TEST],
            required: true,
            default: typesEnums.PRACTICE,
        },
        hackathonMode:{
            type: String,
            enum: [typesEnums.LIVE, typesEnums.PRACTICE],
            required: true,
            default: typesEnums.PRACTICE,
        },
        submissionType: {
            type: String,
            enum: [submissionsType.INDIVIDUAL, submissionsType.TEAM],
            required: true,
            default: submissionsType.INDIVIDUAL,
        },
        teamSize: {
            type: Number,
            default:1
        },
        startDate: {
            type: Date,
        },
        maxStartDate: {
            type: Date,
        },
        endDate: {
            type: String,
        },
        resultDate: {
            type: Date,
        },
        prizes: {
            type: String,
        },
        details: {
            type: String,
        },
        questions: {
            type: [question],
            required: false,
        }
    },
    { timestamps: true }
);


module.exports = mongoose.model("hackathon", hackathonSchema);
