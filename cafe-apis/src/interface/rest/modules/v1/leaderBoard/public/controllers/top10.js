const statusCodes = require('src/interface/rest/constants/statusCodes');
const ok = require('src/interface/rest/responses/ok');

const { leaderBoardSerializer } = require('../../serializer');

module.exports = async (req, res) => {
    const { GetTop10UseCase } = req.scope.cradle;
    const { rows: top10 } = await GetTop10UseCase.execute();
    return res.status(statusCodes.SUCCESS).json(
        ok('Data Received Successfully', { data: top10.map(leaderBoardSerializer) }),
    );
};
