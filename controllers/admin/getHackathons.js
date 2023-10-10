const Hackathon = require('../../models/admin/hackathon');
const { httpStatus200, httpStatus404 } = require('../../utils/httpResponse');
const mongoose = require('mongoose');

const listHackathonBySearch = async (req, res) => {

    const { skip, limit, search, hackathonType, hackathonId } = req.query;

    const query = {};

    if (search) {
        query['title'] = { $regex: search, $options: 'i' };
    }
    if (hackathonType) {
        query['hackathonType'] = hackathonType;
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
