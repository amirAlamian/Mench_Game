const { deviceId, name, inviteCode } = require('../userProperties');

class GuestLoginRequest {
    constructor ({ Validator, LocaleService, props }) {
        this.Validator = Validator;
        this.props = props;
        this.LocaleService = LocaleService;
        this.schema = {
            type: 'object',
            additionalProperties: false,
            required: [ 'deviceId' ],
            properties: {
                deviceId,
                name,
                inviteCode,
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

module.exports = GuestLoginRequest;
