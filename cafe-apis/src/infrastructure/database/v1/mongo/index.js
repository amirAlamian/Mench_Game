const mongoose = require('mongoose');

class MongoDb {
    constructor ({ config }) {
        this.config = config;
    }
    connect = () =>
        new Promise((resolve, reject) => {
            const {
                host,
                port,
                username,
                password,
                database,
                poolSize,
            } = this.config.db;
            const options = {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useFindAndModify: false,
                useCreateIndex: true,
                dbName: database,
                user: username,
                pass: password,
                poolSize,
            };

            mongoose.connect(
                `mongodb://${host}:${port}`,
                options,
                async (error, data) => {
                    if (error) {
                        reject(error);
                    } else {
                        this.connection = data;
                        resolve(data);
                    }
                },
            );
        });

    disconnect = () => mongoose.connection.close();
}

module.exports = MongoDb;
