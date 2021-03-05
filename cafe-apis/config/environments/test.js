const baseConfig = require('../base');

const config = {
    ...baseConfig,
    db: {
        ...baseConfig.db,
        database: 'casitt_template_test',
        host: 'casitt-mongo-test',
        port: 27017,
        poolSize: 5,
    },
    redis: {
        ...baseConfig.db,
        db: 1,
    },
};

module.exports = config;
