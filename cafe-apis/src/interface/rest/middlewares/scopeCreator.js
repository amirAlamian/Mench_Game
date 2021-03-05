const { asValue } = require('awilix');

// extract entities from repository and register it in awilix
const createBindings = async (container, requestParams, bindingParams) => {
    for (const [ param, collection ] of Object.entries(bindingParams)) {
        // create repository name and resolve it
        const repository = container.resolve(`${collection.charAt(0).toUpperCase() + collection.substr(1)}Repository`);

        const entity = await repository.findById(requestParams[param]);

        if (entity) {
            container.register({ [collection]: asValue(entity) });
        } else {
            throw {
                code: 'NOT_FOUND',
                resource: `templateField.words.${collection}`,
            };
        }
    }
};

const registerData = (container, query, body, params, headers, currentUser) => {
    const filters = {};
    // some fields are reserved and have special meaning, so they shouldn't be registered as filters
    Object.entries(query)
        .filter(([ key ]) => ![ 'orderBy', 'orderType', 'fields', 'limit', 'offset' ].includes(key))
        .forEach(([ key, value ]) => {
            filters[key] = value;
        });

    container.register({
        orderBy: asValue(query.orderBy),
        orderType: asValue(query.orderType),
        limit: asValue(query.limit),
        offset: asValue(query.offset),
        fields: asValue(query.fields || []),
        filters: asValue(filters),
        props: asValue({ ...body, ...params }),
        currentUser: currentUser.payload ? asValue(currentUser.payload) : null,
        locale: asValue(headers['accept-language']),
    });
};

module.exports = (container, Authenticate = true, bindingParams = {}) => async (req, res, next) => {
    const currentUser = {};
    const { Authentication, UserRepository } = container.cradle;

    if (Authenticate) {
        await Authentication.validateAccess(req, res, next, currentUser, UserRepository);
    }


    if (req.body.refreshToken) {
        await Authentication.validateRefreshToken(req, res, next, currentUser);
    }

    req.scope = container.createScope();


    await createBindings(req.scope, req.params, bindingParams);

    registerData(req.scope, req.query, req.body, req.params, req.headers, currentUser);

    next();
};
