const Hackathon = require("../../models/admin/hackathon");
const { httpStatus200, httpStatus404 } = require("../../utils/httpResponse");
const mongoose = require("mongoose");

const fetchTeamsSubmission = async (req, res) => {
    const { hackathonId, questionId } = req.query;

    const query = {};

    if (!hackathonId) {
        return res.status(404).json(httpStatus404("Id not found", hackathonId));
    }
    query["_id"] = new mongoose.Types.ObjectId(hackathonId);

    const fetchHackathon = await Hackathon.aggregate([
        {
            $match: query,
        },
        {
            $lookup: {
                from: 'userhackathonsubmissions',
                localField: '_id',
                foreignField: 'hackathonId',
                as: 'Results'
            }
        },
        {
            $unwind: '$Results'
        },
        {
            $sort: {
                'Results.updatedAt': -1,
            }
        },
        {
            $project: {
                "teams": 1,
                "Results.userId": 1,
                "Results.teamId": 1,
                "Results.hackathonId": 1,
                "Results.title": 1,
                "Results.status": 1,
                "Results.questions": 1,

                question: {
                    $filter: {
                        input: '$questions',
                        as: 'question',
                        cond: {
                            $eq: ['$$question._id', new mongoose.Types.ObjectId(questionId)]
                        }
                    }
                },

                answers: {
                    $filter: {
                        input: '$Results.submission',
                        as: 'result',
                        cond: {
                            $eq: ['$$result.questionId', new mongoose.Types.ObjectId(questionId)]
                        }
                    }
                }
            }
        },
        {
            $lookup: {
                from: 'hackathonteams',
                localField: 'Results.teamId',
                foreignField: '_id',
                as: 'teams'
            }
        },

    ]);

    if (!fetchHackathon) {
        return res
            .status(404)
            .json(httpStatus404("Hackathon not found", { metadata: [{ total: 0 }] }));
    }

    return res.status(200).json(httpStatus200(fetchHackathon));
};

module.exports = fetchTeamsSubmission;


