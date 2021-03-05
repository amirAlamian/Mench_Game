const post = require('./post');
const Verification = require('./Verification');
const VerifyCode = require('./VerifyCode');
const register = require('./register');
const guestToNormal = require('./guestToNormal');
const updateUser = require('./updateUser');
const get = require('./get');
const search = require('./search');

module.exports = {
    post,
    Verification,
    VerifyCode,
    register,
    guestToNormal,
    updateUser,
    get,
    search,
};
