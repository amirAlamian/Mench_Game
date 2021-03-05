const statusCodes = require('src/interface/rest/constants/statusCodes');
const ok = require('src/interface/rest/responses/ok');

const {
    matchRequestSerializer,
} = require('../../serializer');

module.exports = async (req, res) => {
    const {
        RejectMatchRequestUseCase,
    } = req.scope.cradle;
    const matchRequest = await RejectMatchRequestUseCase.execute();

    if (matchRequest) {
        return res.status(statusCodes.SUCCESS).json(
            ok('Match Request Rejected Successfully', {
                data: matchRequestSerializer(matchRequest),
            }),
        );
    }
};
