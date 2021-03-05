const statusCodes = require('src/interface/rest/constants/statusCodes');
const ok = require('src/interface/rest/responses/ok');

const { friendshipSerializer } = require('../../serializer');

module.exports = async (req, res) => {
    const { AcceptFriendRequestUseCase } = req.scope.cradle;
    const friendship = await AcceptFriendRequestUseCase.execute();
    return res.status(statusCodes.SUCCESS).json(
        ok('Friend Request Sent Successfully', { data: friendshipSerializer(friendship) }),
    );
};
