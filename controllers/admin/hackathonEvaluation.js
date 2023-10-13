const MockSubmissions = require('../../../models/userMockSubmission');
const { mockTestStatus } = require('../../../models/userMockSubmission');
const { httpStatus200, httpStatus500 } = require('../../../utils/httpResponse');

const userHackathonEvaluation = async (req, res) => {
    const { documentId, questionId } = req.query;
    const { marks, comment } = req.body;

    const currentMockTestSubmissions = await MockSubmissions.findOne({ _id: documentId, 'mockSubmissions.questionId': questionId });

    if (currentMockTestSubmissions.mockTestStatus === mockTestStatus.EVALUATED) {
        return res
            .status(500)
            .json(httpStatus500({ message: 'Test already evaluated' }));
    }
    if (currentMockTestSubmissions.mockTestStatus === mockTestStatus.NOT_SUBMITTED) {
        return res
            .status(500)
            .json(httpStatus500({ message: 'Test not submitted by user yet' }));
    }
    let updatedMockTestSubmissions;
    if (documentId && questionId) {
        updatedMockTestSubmissions = await MockSubmissions.findOneAndUpdate(
            { _id: documentId, 'mockSubmissions.questionId': questionId },
            {
                $set: {
                    'mockSubmissions.$.comment': comment,
                    'mockSubmissions.$.received': marks,
                    'mockSubmissions.$.isChecked': true,
                },
            },
            { new: true, omitUndefined: true, runValidators: true }
        );
        if (!updatedMockTestSubmissions) {
            return res
                .status(500)
                .json(httpStatus500({ message: 'Failed to evaluate Hackathon question' }));
        }
    }
    if (documentId) {
        const isAllQuestionAnswersEvaluated = await MockSubmissions.find({
            _id: documentId,
            mockSubmissions: {
                $elemMatch: {
                    isChecked: 'false',
                },
            },
        });
        if (!isAllQuestionAnswersEvaluated.length) {
            const evaluatedMockTest = await MockSubmissions.findOneAndUpdate(
                { _id: documentId },
                {
                    $set: {
                        mockTestStatus: mockTestStatus.EVALUATED,
                    },
                    $push: {
                        history: {
                            mockTestId: updatedMockTestSubmissions.mockTestId,
                            mockSubmissions: updatedMockTestSubmissions.mockSubmissions
                        }
                    }
                },
                { new: true, omitUndefined: true }
            );
            if (!evaluatedMockTest) {
                return res
                    .status(500)
                    .json(
                        httpStatus500({ message: 'Failed to submit Hackathon Evaluation' })
                    );
            }
            return res
                .status(200)
                .json(httpStatus200(true, 'Hackathon Evaluated successfully'));
        }
        return res
            .status(200)
            .json(httpStatus200(true, 'Hackathon question evaluated successful'));
    }
    return res
        .status(500)
        .json(httpStatus500({ message: 'Failed to Evaluate Hackathon' }));
};

module.exports = userHackathonEvaluation;