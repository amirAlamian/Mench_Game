const statusCodes = require('src/interface/rest/constants/statusCodes');
const ok = require('src/interface/rest/responses/ok');
const { shopSerializer } = require('../../serializer');


module.exports = async (req, res) => {
    const { GetShopItemsUseCase } = req.scope.cradle;
    const shop = await GetShopItemsUseCase.execute();


    return res.status(statusCodes.SUCCESS).json(
        ok('Data Received Successfully', shopSerializer(shop)),
    );
};
