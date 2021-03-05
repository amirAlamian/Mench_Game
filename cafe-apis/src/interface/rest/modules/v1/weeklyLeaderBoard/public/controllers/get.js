const statusCodes = require('src/interface/rest/constants/statusCodes');
const ok = require('src/interface/rest/responses/ok');

const { weeklyLeaderBoardSerializer } = require('../../serializer');

module.exports = async (req, res) => {
    const { GetWeeklyLeaderBoardUseCase } = req.scope.cradle;
    const { rows: users } = await GetWeeklyLeaderBoardUseCase.execute();
    return res.status(statusCodes.SUCCESS).json(
        ok('Data Received Successfully', { data: users.map(weeklyLeaderBoardSerializer) }),
    );
};
