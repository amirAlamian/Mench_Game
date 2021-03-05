const statusCodes = require('src/interface/rest/constants/statusCodes');
const ok = require('src/interface/rest/responses/ok');

const { serializeUser } = require('../../serializer');

module.exports = async (req, res) => {
    const { GuestLoginUseCase } = req.scope.cradle;
    const { user, authTokens } = await GuestLoginUseCase.execute();

    if (user) {
        return res.status(statusCodes.SUCCESS).json(
            ok('Guest Registered Successfully', { data: serializeUser(user), authData: authTokens }),
        );
    }
};
