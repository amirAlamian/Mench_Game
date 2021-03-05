const { matchId } = require('../matchRequestProperties');

class RejectMatchRequestRequest {
    constructor ({ Validator, LocaleService, props }) {
        this.Validator = Validator;
        this.props = props;
        this.LocaleService = LocaleService;
        this.schema = {
            type: 'object',
            additionalProperties: false,
            required: [ 'matchId' ],
            properties: {
                matchId,
            },

        };
    }

    async validate () {
        return await this.Validator.validate('matchRequest', this.props, this.schema);
    }

    async authorize () {
        return true;
    }
}

module.exports = RejectMatchRequestRequest;
