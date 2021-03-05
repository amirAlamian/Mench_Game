const { maxPlayers, gameMode } = require('../matchMakingProperties');

class MakeNormalMatchRequest {
    constructor ({ Validator, LocaleService, props }) {
        this.Validator = Validator;
        this.props = props;
        this.LocaleService = LocaleService;
        this.schema = {
            type: 'object',
            additionalProperties: false,
            required: [ 'maxPlayers', 'gameMode' ],
            properties: {
                maxPlayers,
                gameMode,
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

module.exports = MakeNormalMatchRequest;
