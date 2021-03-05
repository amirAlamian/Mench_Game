const { refreshToken } = require('../oauthTokenProperties');

class GetUserRequest {
    constructor ({ Validator, LocaleService, props }) {
        this.Validator = Validator;
        this.props = props;
        this.LocaleService = LocaleService;
        this.schema = {
            type: 'object',
            additionalProperties: false,
            required: [ 'refreshToken' ],
            properties: {
                refreshToken,
            },

        };
    }

    async validate () {
        return await this.Validator.validate('oauth', this.props, this.schema);
    }

    async authorize () {
        return true;
    }
}

module.exports = GetUserRequest;
