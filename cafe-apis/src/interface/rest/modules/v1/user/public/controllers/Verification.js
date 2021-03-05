const statusCodes = require('src/interface/rest/constants/statusCodes');
const ok = require('src/interface/rest/responses/ok');


module.exports = async (req, res) => {
    const { SendVerificationCodeUseCase } = req.scope.cradle;
    await SendVerificationCodeUseCase.execute();
    return res.status(statusCodes.SUCCESS).json(
        ok('Verification Code Sent Successfully'),
    );
};
