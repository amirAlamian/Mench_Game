const statusCodes = require('src/interface/rest/constants/statusCodes');
const ok = require('src/interface/rest/responses/ok');

const { leaderBoardSerializer } = require('../../serializer');

module.exports = async (req, res) => {
    const { GetFriendsLeaderBoardUseCase } = req.scope.cradle;
    const { rows: friendsLeaderBoard } = await GetFriendsLeaderBoardUseCase.execute();
    return res.status(statusCodes.SUCCESS).json(
        ok('Data Received Successfully', { data: friendsLeaderBoard.map(leaderBoardSerializer) }),
    );
};
