const statusCodes = require('src/interface/rest/constants/statusCodes');
const ok = require('src/interface/rest/responses/ok');
const { serializeUser } = require('../../serializer');

module.exports = async (req, res) => {
    const { RegisterUserUseCase } = req.scope.cradle;
    const { user, authTokens } = await RegisterUserUseCase.execute();

    if (user) {
        return res.status(statusCodes.SUCCESS).json(
            ok('Registered Successfully', { data: serializeUser(user), authData: authTokens }),
        );
    }
};
