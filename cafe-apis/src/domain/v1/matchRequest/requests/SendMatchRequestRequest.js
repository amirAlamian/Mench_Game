const { username, gameMode } = require('../matchRequestProperties');

class SendMatchRequestRequest {
    constructor ({ Validator, LocaleService, props }) {
        this.Validator = Validator;
        this.props = props;
        this.LocaleService = LocaleService;
        this.schema = {
            type: 'object',
            additionalProperties: false,
            required: [ 'username', 'gameMode' ],
            properties: {
                username,
                gameMode,
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

module.exports = SendMatchRequestRequest;
