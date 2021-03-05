const { username, name, email } = require('../userProperties');

class UpdateUserRequest {
    constructor ({ Validator, LocaleService, props }) {
        this.Validator = Validator;
        this.props = props;
        this.LocaleService = LocaleService;
        this.schema = {
            type: 'object',
            additionalProperties: false,
            required: [ ],
            properties: {
                username,
                name,
                email,
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

module.exports = UpdateUserRequest;
