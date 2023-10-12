const Hackathon = require('../../models/admin/hackathon');
const { httpStatus200, httpStatus500 } = require('../../utils/httpResponse');

const deleteHackathon = async (req, res) => {

    const { hackathonId, questionId } = req.query;

    if (hackathonId && questionId) {

        const deleteHackathon = await Hackathon.findOneAndUpdate(
            { _id: hackathonId },
            {
                $pull: {
                    questions: {
                        _id: questionId,
                    },
                },
            }
        );

        if (!deleteHackathon) {
            return res.status(500).json(httpStatus500({ message: "error in deleting Hackathon" }));
        }

        return res
            .status(200)
            .json(httpStatus200('Hackathon deleted successful'));
    }

    if (hackathonId) {

        const deleteHackathon = await Hackathon.findOneAndDelete({ _id: hackathonId });

        if (!deleteHackathon) {
            return res.status(500).json(httpStatus500({ message: "error in deleting Hackathon" }));
        }

        return res
            .status(200)
            .json(httpStatus200(deleteHackathon, 'Hackathon deleted successful'));
    }

    return res.status(500).json(httpStatus500({ message: "Failed to updated Hackathon" }));
};

module.exports = deleteHackathon;