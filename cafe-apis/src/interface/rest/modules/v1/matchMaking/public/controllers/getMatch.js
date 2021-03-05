const statusCodes = require('src/interface/rest/constants/statusCodes');
const ok = require('src/interface/rest/responses/ok');

const { matchMakingSerializer } = require('../../serializer');

module.exports = async (req, res) => {
    const { GetMatchUseCase } = req.scope.cradle;
    const match = await GetMatchUseCase.execute();

    if (match) {
        return res.status(statusCodes.SUCCESS).json(
            ok('Data Received Successfully', { data: matchMakingSerializer(match) }),
        );
    }
};
