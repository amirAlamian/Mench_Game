const { itemType, count, itemId } = require('../shopProperties');

class AddShopItemRequest {
    constructor ({ Validator, props, ShopRepository, currentUser }) {
        this.Validator = Validator;
        this.props = props;
        this.ShopRepository = ShopRepository;
        this.currentUser = currentUser;


        this.schema = {
            type: 'object',
            additionalProperties: false,
            required: [ 'itemType' ],
            properties: {
                itemType,
                count,
                itemId,
            },

        };
    }

    async validate () {
        return await this.Validator.validate('shop', this.props, this.schema);
    }

    async authorize () {
        let shop = await this.ShopRepository.findShopItemByUserId(this.currentUser);

        if (!shop) {
            shop = {};
            shop.userId = this.currentUser;
            shop.dices = [];
            shop.avatars = [];
            shop.powerUps = [];
            shop.nuts = [];
            shop.currencyItems = [];
            shop.new = true;
        }

        let itemFound = false;

        switch (this.props.itemType) {
            case '0':
                if (shop.dices.includes(this.props.itemId)) {
                    throw {
                        code: 'VALIDATION_ERROR',
                        message: 'You Already Bought This Item',
                    };
                }


                shop.dices.push(this.props.itemId);
                break;
            case '1':
                if (shop.avatars.includes(this.props.itemId)) {
                    throw {
                        code: 'VALIDATION_ERROR',
                        message: 'You Already Bought This Item',
                    };
                }

                shop.avatars.push(this.props.itemId);
                break;
            case '2':
                shop.powerUps.forEach(powerUp => {
                    if (powerUp.id === this.props.itemId) {
                        itemFound = true;
                        powerUp.count += Number.parseInt(this.props.count);
                    }
                });


                if (!itemFound) {
                    shop.powerUps.push({
                        id: this.props.itemId,
                        count: Number.parseInt(this.props.count),
                    });
                }

                break;
            case '3':
                if (shop.nuts.includes(this.props.itemId)) {
                    throw {
                        code: 'VALIDATION_ERROR',
                        message: 'You Already Bought This Item',
                    };
                }

                shop.nuts.push(this.props.itemId);
                break;
            case '4':
                shop.currencyItems.push({
                    id: this.props.itemId,
                    count: parseInt(this.props.count),
                });
                break;
            default:
                break;
        }

        this.props.shop = shop;
        return true;
    }
}

module.exports = AddShopItemRequest;
