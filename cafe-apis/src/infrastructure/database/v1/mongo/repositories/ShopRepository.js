const AbstractEntityRepository = require('src/infrastructure/database/v1/mongo/repositories/AbstractEntityRepository');

class ShopRepository extends AbstractEntityRepository {
    constructor ({ shopModel }) {
        super(shopModel, 'shop');
        this.outputs = {
            REPO_DUPLICATE_ERROR: 'DUPLICATE_ERROR',
        };
        this.filterTypes = {
            _id: 'equal',
            id: 'equal',
            userId: 'equal',
        };
        this.translateFields = [ ];
    }

    createShop = async (shopData) => {
        return await this.create(shopData);
    }
    findShopItemByUserId = async (userId) => {
        const criteria = {
            userId,
        };
        return await this.findOne({ criteria });
    }
    updateShopById = async (_id, modifications) => {
        await this.updateById(_id, modifications);
        return await this.findById(_id);
    }
}

module.exports = ShopRepository;
