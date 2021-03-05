const { phoneNumber } = require('../userProperties');

class SendVerificationCodeRequest {
    constructor ({ Validator, LocaleService, props }) {
        this.Validator = Validator;
        this.props = props;
        this.LocaleService = LocaleService;
        this.schema = {
            type: 'object',
            additionalProperties: false,
            required: [ 'phoneNumber' ],
            properties: {
                phoneNumber,
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

module.exports = SendVerificationCodeRequest;
