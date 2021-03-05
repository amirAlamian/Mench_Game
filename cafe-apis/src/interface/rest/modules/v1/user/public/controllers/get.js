const statusCodes = require('src/interface/rest/constants/statusCodes');
const ok = require('src/interface/rest/responses/ok');
const { serializeUser } = require('../../serializer');


module.exports = async (req, res) => {
    const { GetUserUseCase } = req.scope.cradle;
    const user = await GetUserUseCase.execute();

    if (user) {
        return res.status(statusCodes.SUCCESS).json(
            ok('Data Received Successfully', serializeUser(user)),
        );
    }
};
