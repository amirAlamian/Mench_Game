const { NumberPattern } = require('config/regexPatterns');

module.exports = {
    itemType: {
        type: 'string',
        enum: [ '0', '1', '2', '3', '4' ],
    },
    count: {
        oneOf: [
            {
                type: 'integer',
                minimum: 1,
            },
            {
                type: 'string',
                pattern: NumberPattern,
            },
        ],

    },
    itemId: {
        type: 'string',
    },
};
