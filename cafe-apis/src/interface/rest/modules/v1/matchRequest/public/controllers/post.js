const statusCodes = require('src/interface/rest/constants/statusCodes');
const ok = require('src/interface/rest/responses/ok');

const { matchRequestSerializer } = require('../../serializer');

module.exports = async (req, res) => {
    const { SendMatchRequestUseCase } = req.scope.cradle;
    const matchRequest = await SendMatchRequestUseCase.execute();

    if (matchRequest) {
        return res.status(statusCodes.SUCCESS).json(
            ok('Match Request Sent Successfully', { data: matchRequestSerializer(matchRequest) }),
        );
    }
};
