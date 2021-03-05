const { numberPattern } = require('config/regexPatterns');

module.exports = {
    score: {
        oneOf: [
            {
                type: 'integer',

            },
            {
                type: 'string',
                pattern: numberPattern,

            },
        ],
    },
    status: {
        type: 'string',
        enum: [ 'win', 'lose' ],
    },
    coin: {
        oneOf: [
            {
                type: 'integer',

            },
            {
                type: 'string',
                pattern: numberPattern,

            },
        ],
    },
    gem: {
        oneOf: [
            {
                type: 'integer',

            },
            {
                type: 'string',
                pattern: numberPattern,

            },
        ],
    },

};
