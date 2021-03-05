const config = {
    web: {
        port: 4000,
        exposedPort: 3000,
        gatewayPort: 8000,
    },

    db: {
        username: '',
        password: '',
        database: 'cafe_mench',
        host: 'mongo2',
        port: 27017,
        poolSize: 10,
    },
    redis: {
        host: 'redis2', // The redis's server dns 
        port: '6379',
    },
    version: 1,
    serviceName: 'your app name',
    production: false,
};

module.exports = config;
