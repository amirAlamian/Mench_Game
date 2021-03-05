const redis = require('redis');

class Redis {
    constructor ({ config }) {
        this.config = config;
        this.client = redis.createClient(config.redis);
    }
    setRedisData = function (key, value, expireTimeInSec) {
        this.client.set(key, value, function (err) {
            if (err) throw err;
        });
        this.client.expire(key, expireTimeInSec, function (err) {
            if (err) throw err;
        });
    };


    getRedisData = async function (key) {
        return await new Promise((resolve, reject) => {
            this.client.get(key, (err, value) => {
                if (err) reject(err);
                resolve(JSON.parse(value));
            });
        });
    };


    checkVerificationCode = async function (phoneNumber, verificationCode) {
        return await new Promise((resolve, reject) => {
            this.client.get(phoneNumber
                , (err, value) => {
                    if (err) reject(err);
                    resolve(verificationCode === value);
                },
            );
        });
    }
}

module.exports = Redis;
