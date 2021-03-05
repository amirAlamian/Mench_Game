const statusCodes = require('src/interface/rest/constants/statusCodes');
const ok = require('src/interface/rest/responses/ok');

// const { serializeUser } = require('../../serializer');

module.exports = async (req, res) => {
    const { SetRefreshTokenUseCase } = req.scope.cradle;
    const tokens = await SetRefreshTokenUseCase.execute();

    if (tokens) {
        return res.status(statusCodes.SUCCESS).json(
            ok('Access Token Generated Successfully', { data: tokens }),
        );
    }
};
