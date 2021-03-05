const { status } = require('../currenciesProperties');

class AddMatchRequest {
    constructor ({ Validator, LocaleService, props }) {
        this.Validator = Validator;
        this.props = props;
        this.LocaleService = LocaleService;
        this.schema = {
            type: 'object',
            additionalProperties: false,
            required: [ 'status' ],
            properties: {
                status,
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

module.exports = AddMatchRequest;
