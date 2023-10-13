const Hackathon = require("../models/admin/hackathon");
const { httpStatus200, httpStatus404 } = require("../utils/httpResponse");
const mongoose = require("mongoose");

const fetchRounds = async (req, res) => {
    const { hackathonId } = req.query;

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
            $unwind: "$questions",
        },

        {
            $project: {
                "questions._id": 1,
                "questions.roundDetails": 1,
            },
        },
    ]);

    if (!fetchHackathon) {
        return res
            .status(404)
            .json(httpStatus404("Hackathon not found", { metadata: [{ total: 0 }] }));
    }

    return res.status(200).json(httpStatus200(fetchHackathon));
};

module.exports = fetchRounds;
