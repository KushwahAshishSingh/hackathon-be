const Hackathon = require('../models/admin/hackathon');
const { httpStatus200, httpStatus404 } = require('../utils/httpResponse');
const mongoose = require('mongoose');

const listHackathonBySearch = async (req, res) => {

    let { skip, limit, search, hackathonMode, hackathonId } = req.query;
    skip = parseInt(skip)
    limit = parseInt(limit)

    const query = {};
    const currentDate = new Date()

    if (search) {
        query['title'] = { $regex: search, $options: 'i' };
    }

    if (hackathonMode === 'live') {
        query['$and'] = [
            {
                endDate: {
                    $gte: currentDate,
                },
            },
            {
                startDate: {
                    $lte: currentDate,
                },
            },
        ];
    }
    if (hackathonMode === 'upcoming') {
        query['$and'] = [
            {
                startDate: {
                    $gte: currentDate,
                },
            },
            {
                endDate: {
                    $gte: currentDate,
                },
            },
        ];
    }
    if (hackathonMode === 'previous') {
        query['$and'] = [
            {
                startDate: {
                    $lte: currentDate,
                },
            },
            {
                endDate: {
                    $lte: currentDate,
                },
            },
        ];
    }

    if (hackathonId) {
        query['_id'] = new mongoose.Types.ObjectId(hackathonId);
    }

    const fetchHackathon = await Hackathon.aggregate([
        {
            $match: query,
        },
        {
            $facet: {
                metadata: [{ $count: 'total' }],
                mockTest: [
                    { $skip: Number((skip - 1) * limit) },
                    { $limit: Number(limit) },
                ],
            },
        },
        {
            $unwind: {
                path: '$metadata',
                preserveNullAndEmptyArrays: true,
            }
        },
    ]);

    if (!fetchHackathon[0].metadata) {
        return res.status(404).json(httpStatus404('Hackathon not found', { metadata: [{ total: 0 }] }));
    }

    return res
        .status(200)
        .json(
            httpStatus200(
                fetchHackathon
            )
        );
};

module.exports = listHackathonBySearch;
