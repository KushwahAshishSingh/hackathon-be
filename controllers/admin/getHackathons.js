const Hackathon = require('../../models/admin/hackathon');
const { httpStatus200, httpStatus500 } = require('../../utils/httpResponse');
const mongoose = require('mongoose');

const listHackathonBySearch = async (req, res) => {

    const { skip, limit, search, mockType, mockId } = req.query;

    const query = {};

    if (search) {
        query['title'] = { $regex: search, $options: 'i' };
    }
    if (mockType) {
        query['type'] = mockType;
    }
    if (mockId) {
        query['_id'] = mongoose.Types.ObjectId(mockId);
    }

    const mockTest = await Hackathon.aggregate([
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

    if (!mockTest[0].metadata) {
        return res.status(404).json(httpStatus404('MockTest not found', { metadata: [{ total: 0 }] }));
    }

    return res
        .status(200)
        .json(
            httpStatus200(
                mockTest
            )
        );
};

module.exports = listHackathonBySearch;
