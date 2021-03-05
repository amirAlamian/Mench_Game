const statusCodes = require('src/interface/rest/constants/statusCodes');
const ok = require('src/interface/rest/responses/ok');
const { shopSerializer } = require('../../serializer');


module.exports = async (req, res) => {
    const { UsePowerUpUseCase } = req.scope.cradle;
    const shop = await UsePowerUpUseCase.execute();


    return res.status(statusCodes.SUCCESS).json(
        ok('PowerUp Used Successfully', shopSerializer(shop)),
    );
};
