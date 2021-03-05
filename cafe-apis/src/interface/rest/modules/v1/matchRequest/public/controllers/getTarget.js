const statusCodes = require('src/interface/rest/constants/statusCodes');
const ok = require('src/interface/rest/responses/ok');

const { matchRequestSerializer } = require('../../serializer');

module.exports = async (req, res) => {
    const { GetTargetMatchRequestUseCase } = req.scope.cradle;
    const matchRequest = await GetTargetMatchRequestUseCase.execute();

    if (matchRequest) {
        return res.status(statusCodes.SUCCESS).json(
            ok('Data Received Successfuly', { data: matchRequestSerializer(matchRequest) }),
        );
    }
};
