const BaseUseCase = require('src/application/v1/BaseUseCase');

class SendVerificationCodeUseCase extends BaseUseCase {
    constructor ({ SendVerificationCodeRequest, props, UserRepository, AuthRepository, sendRequest, Redis }) {
        super();
        this.request = SendVerificationCodeRequest;
        this.UserRepository = UserRepository;
        this.AuthRepository = AuthRepository;
        this.sendRequest = sendRequest;
        this.Redis = Redis;
        this.props = props;
    }
    execute = async () => {
        await super.execute();

        const tokenBody = {
            UserApiKey: process.env.SMS_USER_API_KEY,
            SecretKey: process.env.SMS_SECURITY_KEY,
        };
        const verificationCode = Math.floor(Math.random() * 10000) + 1;

        const responseToken = await this.sendRequest.request({
            uri: 'https://RestfulSms.com/api/Token',
            method: 'POST',
            json: true,
            body: tokenBody,
        });

        if (responseToken.IsSuccessful === true) {
            const tokenHeader = {
                'x-sms-ir-secure-token': responseToken.TokenKey,
            };
            const verifyBody = {
                Code: verificationCode,
                MobileNumber: this.props.phoneNumber,
            };
            const ResponseCode = await this.sendRequest.request({
                uri: 'https://RestfulSms.com/api/VerificationCode',
                method: 'POST',
                json: true,
                body: verifyBody,
                headers: tokenHeader,
            });

            if (ResponseCode.IsSuccessful === true) {
                this.Redis.setRedisData(this.props.phoneNumber, verificationCode, 120);
                return true;
            }
        }

        throw {
            message: 'Sending Verification Code Failed',
        };
    }
}

module.exports = SendVerificationCodeUseCase;
