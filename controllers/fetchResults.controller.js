const Hackathon = require("../models/admin/hackathon");
const { httpStatus200, httpStatus404 } = require("../utils/httpResponse");
const mongoose = require("mongoose");

const fetchResults = async (req, res) => {
    const {filterInformation, hackathonId } = req.query;

    const query = {};
    let projection = {};

    if (!hackathonId) {
        return res.status(404).json(httpStatus404("Id not found", hackathonId));
    }
    query["_id"] = new mongoose.Types.ObjectId(hackathonId);

    if(filterInformation === "Result"){
        projection = {
            Results: "$Results"
        }
    }

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
             // 'Results.timeTaken': 1 // Then sort by timeTaken in ascending order
            }
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

module.exports = fetchResults;


