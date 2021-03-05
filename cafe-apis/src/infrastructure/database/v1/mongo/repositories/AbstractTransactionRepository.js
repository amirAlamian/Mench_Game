const { database } = require('../index');
const config = require('config');

module.exports = class AbstractTransactionRepository {
    static async cleanDatabase () {
        if (process.env.NODE_ENV !== 'test') {
            throw new Error('Clean database only allowed for test!');
        }

        return database.connection.dropDatabase();
    }

    static getSession (options) {
        return (options && options.session) || undefined;
    }

    static async createSession () {
        if (!config.database.transactions) {
            return;
        }

        const session = await database.connection.startSession();
        await session.startTransaction();
        return session;
    }

    static async commitTransaction (session) {
        if (!config.database.transactions) {
            return;
        }

        return session.commitTransaction();
    }

    static async abortTransaction (session) {
        if (!config.database.transactions) {
            return;
        }

        return session.abortTransaction();
    }

    static async wrapWithSessionIfExists (toWrap, options) {
        if (!this.getSession(options)) {
            return toWrap;
        }

        return toWrap.session(this.getSession(options));
    }

    static getSessionOptionsIfExists (options) {
        if (!this.getSession(options)) {
            return undefined;
        }

        return { session: this.getSession(options) };
    }

    getSession (options) {
        return AbstractTransactionRepository.getSession(options);
    }

    async createSession () {
        return AbstractTransactionRepository.createSession();
    }

    async commitTransaction (session) {
        return AbstractTransactionRepository.commitTransaction(session);
    }

    async abortTransaction (session) {
        return AbstractTransactionRepository.abortTransaction(session);
    }

    async wrapWithSessionIfExists (toWrap, options) {
        return AbstractTransactionRepository.wrapWithSessionIfExists(toWrap, options);
    }

    getSessionOptionsIfExists (options) {
        return AbstractTransactionRepository.getSessionOptionsIfExists(options);
    }
};
