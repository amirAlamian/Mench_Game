const statusCodes = require('src/interface/rest/constants/statusCodes');
const ok = require('src/interface/rest/responses/ok');

const { gameplaySerializer } = require('../../serializer');

module.exports = async (req, res) => {
    const { SetNewActionUseCase } = req.scope.cradle;
    const match = await SetNewActionUseCase.execute();
    return res.status(statusCodes.SUCCESS).json(
        ok('Action Added Successfully', { data: gameplaySerializer(match) }),
    );
};
