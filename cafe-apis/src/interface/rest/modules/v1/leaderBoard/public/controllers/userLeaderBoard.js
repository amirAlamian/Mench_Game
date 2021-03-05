const statusCodes = require('src/interface/rest/constants/statusCodes');
const ok = require('src/interface/rest/responses/ok');


module.exports = async (req, res) => {
    const { GetUserLeaderBoardUseCase } = req.scope.cradle;
    let { count } = await GetUserLeaderBoardUseCase.execute();
    return res.status(statusCodes.SUCCESS).json(
        ok('Data Received Successfully', { data: ++count }),
    );
};
