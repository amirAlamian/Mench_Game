const statusCodes = require('src/interface/rest/constants/statusCodes');
const ok = require('src/interface/rest/responses/ok');

const { gameplaySerializer } = require('../../serializer');

module.exports = async (req, res) => {
    const { GetGameDataUseCase } = req.scope.cradle;
    const match = await GetGameDataUseCase.execute();
    return res.status(statusCodes.SUCCESS).json(
        ok('Data Received Successfully', { data: gameplaySerializer(match) }),
    );
};
