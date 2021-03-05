const { Logger } = require('mongodb');

class GetShopItemsUseCase {
    constructor ({
        ShopRepository,
        currentUser,
    }) {
        this.ShopRepository = ShopRepository;
        this.currentUser = currentUser;
    }
    execute = async () => {
        let shop = await this.ShopRepository.findShopItemByUserId(this.currentUser);

        if (!shop) {
            shop = {};
            shop.userId = this.currentUser;
            return await this.ShopRepository.createShop(shop);
        }

        return shop;
    }
}

module.exports = GetShopItemsUseCase;
