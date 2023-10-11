const Hackathon = require('../../models/admin/hackathon');
const { httpStatus200, httpStatus500, httpStatus409 } = require('../../utils/httpResponse');

const updateHackathon = async (req, res) => {
    const { documentId, questionId } = req.query;
    const { title,hackathonType,hackathonMode,submissionType,startDate,maxStartDate,endDate,resultDate,prizes, questions, details, instruction, companyDetails } = req.body;
    const {name, companyType, place, image} = companyDetails || {};

    if (documentId && questionId) {
        const updateHackathon = await Hackathon.findOneAndUpdate(
            { _id: documentId, 'questions._id': questionId },
            {
                $set: {
                    'questions.$.question': question,
                    'questions.$.questionType': questionType,
                    'questions.$.outOf': outOf,
                },
            },
            { new: true, omitUndefined: true, runValidators: true }
        );
        if (!updateHackathon) {
            return res
                .status(500)
                .json(httpStatus500({ message: 'Failed to update Hackathon' }));
        }
        return res
            .status(200)
            .json(httpStatus200(true, 'Hackathon updated successful'));
    }

    if (documentId) {
        const updateHackathon = await Hackathon.findOneAndUpdate(
            { _id: documentId },
            {
                $set: {
                    title,
                    hackathonType,
                    hackathonMode,
                    submissionType,
                    startDate,
                    maxStartDate,
                    endDate,
                    resultDate,
                    prizes,
                    details,
                    companyDetails
                },
            },
            { new: true, omitUndefined: true }
        );
        if (!updateHackathon) {
            return res
                .status(500)
                .json(httpStatus500({ message: 'Failed to updated Hackathon' }));
        }
        return res
            .status(200)
            .json(httpStatus200(true, 'Hackathon updated successful'));
    }

    return res
        .status(500)
        .json(httpStatus500({ message: 'Failed to updated Hackathon' }));
};

module.exports = updateHackathon;
