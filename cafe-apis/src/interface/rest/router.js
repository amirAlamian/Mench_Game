const express = require('express');
const {
    Router,
} = express;
const cors = require('cors');
const fail = require('src/interface/rest/responses/fail');
const statusCodes =
require('src/interface/rest/constants/statusCodes');
const swaggerUi = require('swagger-ui-express');
const {
    swaggerSpec,
    swaggerOptions,
} = require('config/swagger');
const userRouter = require('src/interface/rest/modules/v1/user/public/router');
const oauthRouter = require('src/interface/rest/modules/v1/oauth/public/router');
const userRewardsRouter = require('src/interface/rest/modules/v1/userRewards/public/router');
const matchRequestRouter = require('src/interface/rest/modules/v1/matchRequest/public/router');
const matchMakingRouter = require('src/interface/rest/modules/v1/matchMaking/public/router');
const chatsRouter = require('src/interface/rest/modules/v1/chats/public/router');
const shopRouter = require('src/interface/rest/modules/v1/shop/public/router');
const gameplayRouter = require('src/interface/rest/modules/v1/gameplay/public/router');
const currenciesRouter = require('src/interface/rest/modules/v1/currencies/public/router');
const friendshipRouter = require('src/interface/rest/modules/v1/friendship/public/router');
const leaderBoardRouter = require('src/interface/rest/modules/v1/leaderBoard/public/router');
const weeklyLeaderBoardRouter = require('src/interface/rest/modules/v1/weeklyLeaderBoard/public/router');
const {
    httpLogger,
    monitorEventLoop,
    minorErrorHandler,
} = require('src/interface/rest/middlewares');

const router = (container) => ({
    logger,
    errorHandler,
    LocaleService,
}) => {
    const apiRouter = Router();

    apiRouter
        .use(cors()) // :TODO set options
        .use(httpLogger(logger))
        .use(express.json())
        .use(minorErrorHandler)
        .use(express.urlencoded({
            extended: false,
        }))
        .use(monitorEventLoop(logger));

    apiRouter.use('/user', userRouter(container));
    apiRouter.use('/oauth', oauthRouter(container));
    apiRouter.use('/userRewards', userRewardsRouter(container));
    apiRouter.use('/matchRequests', matchRequestRouter(container));
    apiRouter.use('/matchmaking', matchMakingRouter(container));
    apiRouter.use('/chats', chatsRouter(container));
    apiRouter.use('/gameplay', gameplayRouter(container));
    apiRouter.use('/shop', shopRouter(container));
    apiRouter.use('/currencies', currenciesRouter(container));
    apiRouter.use('/friendship', friendshipRouter(container));
    apiRouter.use('/leaderboard', leaderBoardRouter(container));
    apiRouter.use('/weeklyLeaderBoard', weeklyLeaderBoardRouter(container));


    // swagger
    apiRouter.get('/api-docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    apiRouter.use(
        '/docs',
        swaggerUi.serve,
        swaggerUi.setup(swaggerSpec, swaggerOptions),
    );

    apiRouter.use('/swagger', (req, res) => {
        res.json(LocaleService.translate('swagger'));
    });
    apiRouter.use('*', (req, res) => {
        res.status(statusCodes.NOT_FOUND).send(fail());
    });
    apiRouter.use(errorHandler);

    return apiRouter;
};

module.exports = router;
