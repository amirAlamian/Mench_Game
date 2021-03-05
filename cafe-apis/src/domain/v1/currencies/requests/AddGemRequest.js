const { gem } = require('../currenciesProperties');

class AddGemRequest {
    constructor ({ Validator, LocaleService, props }) {
        this.Validator = Validator;
        this.props = props;
        this.LocaleService = LocaleService;
        this.schema = {
            type: 'object',
            additionalProperties: false,
            required: [ 'gem' ],
            properties: {
                gem,
            },

        };
    }

    async validate () {
        return await this.Validator.validate('currencies', this.props, this.schema);
    }

    async authorize () {
        return true;
    }
}

module.exports = AddGemRequest;
