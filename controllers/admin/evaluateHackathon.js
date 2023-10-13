const userHackathonSubmitModel = require('../../models/userHackathonSubmit.model')
const { httpStatus200, httpStatus500, httpStatus409 } = require('../../utils/httpResponse');

const evaluateHackathon = async (req, res) => {
    const { hackathonId, questionId, userId } = req.query;
    const { points,status,questionStatus } = req.body;
    const currentDate = new Date()

    if (questionId && hackathonId) {
        const evaluateSubmission = await userHackathonSubmitModel.findOneAndUpdate(
            { hackathonId: hackathonId, 'submission.questionId': questionId , userId: userId  },
            {
                $set: {
                    'submission.$.points': points,
                    'submission.$.status': status,
                    'submission.$.submittedAt': currentDate,
                    'submission.$.questionStatus': questionStatus,
                },
            },
            { new: true, omitUndefined: true, runValidators: true }
        );

        if (!evaluateSubmission) {
            return res
                .status(500)
                .json(httpStatus500({ message: 'Failed to update Hackathon' }));
        }
        return res
            .status(200)
            .json(httpStatus200(true, 'Hackathon updated successful'));
    }

    return res
        .status(500)
        .json(httpStatus500({ message: 'Failed to updated Hackathon' }));
};

module.exports = evaluateHackathon;
