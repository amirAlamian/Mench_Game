const statusCodes = require('src/interface/rest/constants/statusCodes');
const ok = require('src/interface/rest/responses/ok');

const { matchMakingSerializer } = require('../../serializer');

module.exports = async (req, res) => {
    const { CancelMatchUseCase } = req.scope.cradle;
    await CancelMatchUseCase.execute();
    return res.status(statusCodes.SUCCESS).json(
        ok('Data Received Successfully', { data: matchMakingSerializer(match) }),
    );
};
