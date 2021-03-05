const statusCodes = require('src/interface/rest/constants/statusCodes');
const ok = require('src/interface/rest/responses/ok');

const {
    matchRequestSerializer,
} = require('../../serializer');

module.exports = async (req, res) => {
    const {
        AcceptMatchRequestUseCase,
    } = req.scope.cradle;
    const matchRequest = await AcceptMatchRequestUseCase.execute();

    if (matchRequest) {
        return res.status(statusCodes.SUCCESS).json(
            ok('Match Request Accepted and Game Started Successfully', {
                data: matchRequestSerializer(matchRequest),
            }),
        );
    }
};
