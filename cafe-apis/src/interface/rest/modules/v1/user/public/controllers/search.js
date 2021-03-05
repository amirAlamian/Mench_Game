const statusCodes = require('src/interface/rest/constants/statusCodes');
const ok = require('src/interface/rest/responses/ok');

const { serializeUser } = require('../../serializer');

module.exports = async (req, res) => {
    const { SearchForUserUseCase } = req.scope.cradle;
    const { rows } = await SearchForUserUseCase.execute();

    if (rows) {
        return res.status(statusCodes.SUCCESS).json(
            ok('Data Received Successfully', rows.map(serializeUser)),
        );
    }
};
