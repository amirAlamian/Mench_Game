const {
    createContainer,
    asFunction,
    asClass,
    asValue,
    Lifetime,
} = require('awilix');

const config = require('config');
const app = require('src/application/application');
const router = require('src/interface/rest/router');
const { sendRequest } = require('src/infrastructure/comunicationService/rest');
const server = require('src/interface/rest/server');
const errorHandler = require('src/interface/rest/errors/errorHandler');
const devErrorHandler = require('src/interface/rest/errors/devErrorHandler');
const LocaleService = require('src/infrastructure/internationalization/LocaleService');
const Validator = require('src/domain/Validator');
const MongoDb = require('src/infrastructure/database/v1/mongo');
const regexChecker = require('src/infrastructure/regexChecker');
const logger = require('src/infrastructure/logging/logger');
const utils = require('src/infrastructure/utils');
const colors = require('src/infrastructure/logging/colors');
const MongooseQuery = require('src/infrastructure/database/v1/mongo/utils/MongooseQuery');

const container = createContainer();

container.register({
    app: asClass(app).singleton(),
    config: asValue(config),
    MongoDb: asClass(MongoDb)
        .singleton()
        .disposer((pool) => pool.end()),
    MongooseQuery: asClass(MongooseQuery).singleton(),
    server: asClass(server).singleton(),
    regexChecker: asClass(regexChecker),
    logger: asFunction(logger).singleton(),
    sendRequest: asClass(sendRequest).scoped(),
    LocaleService: asClass(LocaleService).singleton(),
    router: asFunction(router(container)).singleton(),
    Validator: asClass(Validator).scoped(),
    colors: asFunction(colors).singleton(),
    utils: asValue(utils),
    errorHandler: asFunction(
        config.production ? errorHandler : devErrorHandler,
    ).singleton(),
    locale: asValue('fa'), // set default before set inside scope
});

// register request models
container.loadModules([
    [
        'src/domain/v1/*/requests/*.js',
        {
            register: asClass,
            lifetime: Lifetime.SCOPED,
        },
    ],
]);
// register use cases
container.loadModules([
    [
        'src/application/v1/*/*/*.js',
        {
            register: asClass,
            lifetime: Lifetime.SCOPED,
        },
    ],
]);
// register repositories
container.loadModules([
    [
        'src/infrastructure/database/v1/mongo/repositories/*.js',
        {
            register: asClass,
            lifetime: Lifetime.SINGLETON,
        },
    ],
]);
// register model
container.loadModules([
    [
        'src/infrastructure/database/v1/mongo/models/*.js',
        {
            register: asValue,
        },
    ],
]);


// register Helpers
container.loadModules([
    [
        'src/infrastructure/Helpers/*.js',
        {
            register: asClass,
            lifetime: Lifetime.SCOPED,
        },
    ],
]);

module.exports = container;
