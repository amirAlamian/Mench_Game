const { itemId } = require('../shopProperties');

class UsePowerUpRequest {
    constructor ({ Validator, props, ShopRepository, currentUser }) {
        this.Validator = Validator;
        this.props = props;
        this.ShopRepository = ShopRepository;
        this.currentUser = currentUser;


        this.schema = {
            type: 'object',
            additionalProperties: false,
            required: [ 'itemId' ],
            properties: {
                itemId,
            },

        };
    }

    async validate () {
        return await this.Validator.validate('shop', this.props, this.schema);
    }

    async authorize () {
        return true;
    }
}

module.exports = UsePowerUpRequest;
