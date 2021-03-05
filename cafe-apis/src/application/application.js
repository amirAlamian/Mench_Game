const regexPatterns = require('config/regexPatterns');

class Application {
    constructor ({ server, regexChecker, MongoDb }) {
        this.regexChecker = regexChecker;
        this.server = server;
        this.MongoDb = MongoDb;
    }

    async start () {
        this.regexChecker.check(regexPatterns);

        await this.MongoDb.connect();

        this.http = await this.server.start();

        return this.http;
    }
}

module.exports = Application;
