const { deviceId, name, phoneNumber, inviteCode, verificationCode } = require('../userProperties');

class GuestLoginRequest {
    constructor ({ Validator, LocaleService, props, Redis }) {
        this.Validator = Validator;
        this.props = props;
        this.LocaleService = LocaleService;
        this.Redis = Redis;
        this.schema = {
            type: 'object',
            additionalProperties: false,
            required: [ 'phoneNumber', 'verificationCode' ],
            properties: {
                deviceId,
                name,
                verificationCode,
                phoneNumber,
                inviteCode,
            },
        };
    }

    async validate () {
        return await this.Validator.validate('user', this.props, this.schema);
    }

    async authorize () {
        const VerifiedCode = await this.Redis.checkVerificationCode(
            this.props.phoneNumber,
            this.props.verificationCode,
        );

        if (!VerifiedCode) {
            throw {
                code: 'FORBIDDEN',
                message: 'Your Verification Code is Wrong',
            };
        }

        return true;
    }
}

module.exports = GuestLoginRequest;
