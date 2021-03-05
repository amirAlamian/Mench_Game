const { username } = require('../userProperties');

class GetUserRequest {
    constructor ({ Validator, LocaleService, props }) {
        this.Validator = Validator;
        this.props = props;
        this.LocaleService = LocaleService;
        this.schema = {
            type: 'object',
            additionalProperties: false,
            required: [ 'username' ],
            properties: {
                username,
            },

        };
    }

    async validate () {
        return await this.Validator.validate('user', this.props, this.schema);
    }

    async authorize () {
        return true;
    }
}

module.exports = GetUserRequest;
