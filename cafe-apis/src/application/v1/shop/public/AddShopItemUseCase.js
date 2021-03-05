const BaseUseCase = require('src/application/v1/BaseUseCase');

class AddShopItemUseCase extends BaseUseCase {
    constructor ({
        AddShopItemRequest,
        props,
        ShopRepository,
        currentUser,
    }) {
        super();
        this.request = AddShopItemRequest;
        this.props = props;
        this.ShopRepository = ShopRepository;
        this.currentUser = currentUser;
    }
    execute = async () => {
        await super.execute();

        if (this.props.shop.new) {
            Reflect.deleteProperty(this.props.shop, 'new');
            return await this.ShopRepository.createShop(this.props.shop);
        }

        const {
            dices,
            avatars,
            powerUps,
            nuts,
            currencyItems,
        } = this.props.shop;

        return await this.ShopRepository.updateShopById(this.props.shop._id, {
            dices,
            avatars,
            powerUps,
            nuts,
            currencyItems,
        });
    }
}

module.exports = AddShopItemUseCase;
