const BaseUseCase = require('src/application/v1/BaseUseCase');

class UsePowerUpUseCase extends BaseUseCase {
    constructor ({
        UsePowerUpRequest,
        props,
        ShopRepository,
        currentUser,
    }) {
        super();
        this.request = UsePowerUpRequest;
        this.props = props;
        this.ShopRepository = ShopRepository;
        this.currentUser = currentUser;
    }
    execute = async () => {
        await super.execute();

        const shop = await this.ShopRepository.findShopItemByUserId(this.currentUser);

        if (!shop) {
            throw { message: 'Item Not Found', code: 'NOT_FOUND' };
        }

        let itemFound = false;
        shop.powerUps.forEach(element => {
            if (element.id === this.props.itemId) {
                itemFound = true;

                if (element.count > 0) {
                    element.count--;
                } else {
                    throw {
                        code: 'FORBIDDEN',
                        message: 'your don\'t have any powerUps',
                    };
                }
            }
        });

        if (!itemFound) {
            throw { message: 'Item Not Found', code: 'NOT_FOUND' };
        }


        return await this.ShopRepository.updateShopById(shop._id, { powerUps: shop.powerUps });
    }
}

module.exports = UsePowerUpUseCase;
