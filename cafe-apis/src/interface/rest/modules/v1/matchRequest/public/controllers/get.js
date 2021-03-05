const statusCodes = require('src/interface/rest/constants/statusCodes');
const ok = require('src/interface/rest/responses/ok');

const { matchRequestSerializer } = require('../../serializer');

module.exports = async (req, res) => {
    const { GetMatchRequestsUseCase } = req.scope.cradle;
    const matchRequests = await GetMatchRequestsUseCase.execute();

    if (matchRequests) {
        return res.status(statusCodes.SUCCESS).json(
            ok('Data Received Successfully', { data: matchRequests.map(matchRequestSerializer) }),
        );
    }
};
