const baseConfig = require('../base');

const config = {
    ...baseConfig,
    db: {
        ...baseConfig.db,
        poolSize: 5,
    },
    web: {
        ...baseConfig.web,
        exposedPort: 9082,
    },
};

module.exports = config;
