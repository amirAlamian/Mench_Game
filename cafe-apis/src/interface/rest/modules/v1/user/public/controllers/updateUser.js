const statusCodes = require('src/interface/rest/constants/statusCodes');
const ok = require('src/interface/rest/responses/ok');
const { serializeUser } = require('../../serializer');

module.exports = async (req, res) => {
    const { UpdateUserUseCase } = req.scope.cradle;

    const user = await UpdateUserUseCase.execute();

    if (user) {
        return res.status(statusCodes.SUCCESS).json(
            ok('User Updated Successfully', { data: serializeUser(user) }),
        );
    }
};
