const { name, username, email, phoneNumber, password } = require('../userProperties');

class RegisterUserRequest {
    constructor ({ Validator, LocaleService, props }) {
        this.Validator = Validator;
        this.props = props;
        this.LocaleService = LocaleService;
        this.schema = {
            type: 'object',
            additionalProperties: false,
            required: [ 'name', 'email', 'phoneNumber', 'password' ],
            properties: {
                name,
                username,
                email,
                phoneNumber,
                password,
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

module.exports = RegisterUserRequest;
