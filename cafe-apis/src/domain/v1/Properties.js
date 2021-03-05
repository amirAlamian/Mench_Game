module.exports = {
    id: {
        type: 'integer',
        minimum: 1,
    },
    example: {
        type: 'string',
    },
    arrayIds: {
        type: 'array',
        items: {
            type: 'integer',
            minimum: 1,
        },
    },
    type: {
        type: 'string',
    },
};
