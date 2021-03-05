const statusCodes = require('src/interface/rest/constants/statusCodes');
const ok = require('src/interface/rest/responses/ok');

const { friendshipSerializer } = require('../../serializer');

module.exports = async (req, res) => {
    const { RejectFriendRequestUseCase } = req.scope.cradle;
    const friendship = await RejectFriendRequestUseCase.execute();
    return res.status(statusCodes.SUCCESS).json(
        ok('Friend Request Rejected Successfully', { data: friendshipSerializer(friendship) }),
    );
};
