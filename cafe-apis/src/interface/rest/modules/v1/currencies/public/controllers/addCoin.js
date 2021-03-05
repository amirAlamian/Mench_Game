const statusCodes = require('src/interface/rest/constants/statusCodes');
const ok = require('src/interface/rest/responses/ok');

const { currenciesSerializer } = require('../../serializer');

module.exports = async (req, res) => {
    const { AddCoinUseCase } = req.scope.cradle;
    const currencies = await AddCoinUseCase.execute();
    return res.status(statusCodes.SUCCESS).json(
        ok('Coin Added Successfully', { data: currenciesSerializer(currencies) }),
    );
};
