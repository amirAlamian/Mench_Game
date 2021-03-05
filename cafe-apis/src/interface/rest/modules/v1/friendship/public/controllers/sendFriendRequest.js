const statusCodes = require('src/interface/rest/constants/statusCodes');
const ok = require('src/interface/rest/responses/ok');

const { friendshipSerializer } = require('../../serializer');

module.exports = async (req, res) => {
    const { SendFriendRequestUseCase } = req.scope.cradle;
    const friendship = await SendFriendRequestUseCase.execute();
    return res.status(statusCodes.SUCCESS).json(
        ok('Friend Request Sent Successfully', { data: friendshipSerializer(friendship) }),
    );
};
