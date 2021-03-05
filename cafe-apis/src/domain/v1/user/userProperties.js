const { mobilePattern, numbersPattern, emailPattern, normalPasswordPattern } = require('config/regexPatterns');

module.exports = {
    deviceId: {
        type: 'string',
        minLength: 1,
    },
    name: {
        type: 'string',
        minLength: 1,
    },
    phoneNumber: {
        type: 'string',
        pattern: mobilePattern,
    },
    inviteCode: {
        type: 'string',
        minLength: 8,
        maxLength: 8,
    },
    verificationCode: {
        type: 'string',
        pattern: numbersPattern,
    },
    username: {
        type: 'string',
        minLength: 2,
        maxLength: 50,
    },
    email: {
        type: 'string',
        // pattern: emailPattern,
    },
    password: {
        type: 'string',
        pattern: normalPasswordPattern,
    },
};
