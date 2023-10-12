const Hackathon = require("../models/admin/hackathon");
const { httpStatus200, httpStatus404 } = require("../utils/httpResponse");
const mongoose = require("mongoose");

const listHackathonBySearch = async (req, res) => {
    const {filterInformation, hackathonId } = req.query;

    const query = {};
    let projection = {};

    if (!hackathonId) {
        return res.status(404).json(httpStatus404("Id not found", hackathonId));
    }

    query["_id"] = new mongoose.Types.ObjectId(hackathonId);

    if (filterInformation === "About") {
        projection = {
            About: "$details",
        };
    } else if (filterInformation === "Rules") {
        projection = {
            Rules: "$instruction",
        };
    } else if (filterInformation === "Prizes") {
        projection = {
            Prizes: "$prizes",
        };
    } else if (filterInformation === "Timelines") {
        projection = {
            Timelines: {
                StartDate: "$startDate",
                RegistrationEnds: "$maxStartDate",
                EndDate: "$endDate",
                ResultDate: "$resultDate",
            },
        };
    }

    const fetchHackathon = await Hackathon.aggregate([
        {
            $match: query,
        },
        {
            $project: projection,
        },
    ]);

    if (!fetchHackathon) {
        return res
            .status(404)
            .json(httpStatus404("Hackathon not found", { metadata: [{ total: 0 }] }));
    }

    return res.status(200).json(httpStatus200(fetchHackathon));
};

module.exports = listHackathonBySearch;
