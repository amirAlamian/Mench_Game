const statusCodes = require('src/interface/rest/constants/statusCodes');
const ok = require('src/interface/rest/responses/ok');
const { shopSerializer } = require('../../serializer');


module.exports = async (req, res) => {
    const { AddShopItemUseCase } = req.scope.cradle;
    const shop = await AddShopItemUseCase.execute();


    return res.status(statusCodes.SUCCESS).json(
        ok('Item Added Successfully', shopSerializer(shop)),
    );
};
