const statusCodes = require('src/interface/rest/constants/statusCodes');
const ok = require('src/interface/rest/responses/ok');

const { serializeUserRewards } = require('../../serializer');

module.exports = async (req, res) => {
    const { GetUserRewardsUseCase } = req.scope.cradle;
    const { rows } = await GetUserRewardsUseCase.execute();

    if (rows) {
        return res.status(statusCodes.SUCCESS).json(
            ok('Data Received Successfully', { data: rows.map(serializeUserRewards) }),
        );
    }
};
