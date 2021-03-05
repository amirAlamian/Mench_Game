const { matchId } = require('../matchMakingProperties');

class GetMatchRequest {
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
        return await this.Validator.validate('matchMaking', this.props, this.schema);
    }

    async authorize () {
        return true;
    }
}

module.exports = GetMatchRequest;
