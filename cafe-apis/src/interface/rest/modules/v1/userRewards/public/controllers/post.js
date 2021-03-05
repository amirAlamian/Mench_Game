const statusCodes = require('src/interface/rest/constants/statusCodes');
const ok = require('src/interface/rest/responses/ok');

const { serializeUserRewards } = require('../../serializer');

module.exports = async (req, res) => {
    const { UseRewardsUseCase } = req.scope.cradle;
    const user = await UseRewardsUseCase.execute();

    if (user) {
        return res.status(statusCodes.SUCCESS).json(
            ok('Reward Used Successfully', { data: serializeUserRewards(user) }),
        );
    }
};
