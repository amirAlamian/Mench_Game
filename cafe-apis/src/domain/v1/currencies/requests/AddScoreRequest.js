const { score } = require('../currenciesProperties');

class AddScoreRequest {
    constructor ({ Validator, LocaleService, props }) {
        this.Validator = Validator;
        this.props = props;
        this.LocaleService = LocaleService;
        this.schema = {
            type: 'object',
            additionalProperties: false,
            required: [ 'score' ],
            properties: {
                score,
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

module.exports = AddScoreRequest;
