const statusCodes = require('src/interface/rest/constants/statusCodes');
const ok = require('src/interface/rest/responses/ok');

const { currenciesSerializer } = require('../../serializer');

module.exports = async (req, res) => {
    const { AddGemUseCase } = req.scope.cradle;
    const currencies = await AddGemUseCase.execute();
    return res.status(statusCodes.SUCCESS).json(
        ok('Gem Added Successfully', { data: currenciesSerializer(currencies) }),
    );
};
