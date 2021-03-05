const statusCodes = require('src/interface/rest/constants/statusCodes');
const ok = require('src/interface/rest/responses/ok');

const { currenciesSerializer } = require('../../serializer');

module.exports = async (req, res) => {
    const { AddMatchUseCase } = req.scope.cradle;
    const currencies = await AddMatchUseCase.execute();
    return res.status(statusCodes.SUCCESS).json(
        ok('Match Added Successfully', { data: currenciesSerializer(currencies) }),
    );
};
