const statusCodes = require('src/interface/rest/constants/statusCodes');
const ok = require('src/interface/rest/responses/ok');

const { currenciesSerializer } = require('../../serializer');

module.exports = async (req, res) => {
    const { AddScoreUseCase } = req.scope.cradle;
    const currencies = await AddScoreUseCase.execute();
    return res.status(statusCodes.SUCCESS).json(
        ok('Score Added Successfully', { data: currenciesSerializer(currencies) }),
    );
};
