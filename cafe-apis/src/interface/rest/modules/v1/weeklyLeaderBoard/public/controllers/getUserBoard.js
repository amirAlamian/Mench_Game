const statusCodes = require('src/interface/rest/constants/statusCodes');
const ok = require('src/interface/rest/responses/ok');


module.exports = async (req, res) => {
    const { GetUSerWeeklyLeaderBoardUseCase } = req.scope.cradle;
    const userBoard = await GetUSerWeeklyLeaderBoardUseCase.execute();
    return res.status(statusCodes.SUCCESS).json(
        ok('Data Received Successfully', { data: userBoard }),
    );
};
