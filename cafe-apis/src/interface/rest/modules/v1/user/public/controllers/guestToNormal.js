const statusCodes = require('src/interface/rest/constants/statusCodes');
const ok = require('src/interface/rest/responses/ok');


module.exports = async (req, res) => {
    const { ChangeGuestToNormalUseCase } = req.scope.cradle;
    const uid = await ChangeGuestToNormalUseCase.execute();

    if (uid) {
        return res.status(statusCodes.SUCCESS).json(
            ok(uid),
        );
    }
};
