const statusCodes = require('src/interface/rest/constants/statusCodes');
const ok = require('src/interface/rest/responses/ok');


module.exports = async (req, res) => {
    const { VerifyCodeUseCase } = req.scope.cradle;
    await VerifyCodeUseCase.execute();
    return res.status(statusCodes.SUCCESS).json(
        ok('User Registered and LoggedIn Successfully'),
    );
};
