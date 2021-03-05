const {
    Router,
} = require('express');
const {
    scopeCreator,
} = require('src/interface/rest/middlewares');
const {
    get,
    getUserBoard,
} = require('./controllers');

module.exports = (container) => {
    /**
     * @swagger
     * components:
     *   securitySchemes:
     *       bearerAuth:
     *         type: http
     *         scheme: bearer
     *         bearerFormat: JWT
     *   schemas:
     *       position:
     *           type: object
     *           properties:
     *              username: 
     *                  string
     */

    const router = Router();

    /**
     * @swagger
     *
     *   /weeklyLeaderBoard/:
     *      get:
     *         tags: ['weeklyLeaderBoard']
     *         order: 1
     *         responses:
     *           200:
     *             description: Item is ready.
     *           400:
     *             description: Request failed.
     *           404:
     *             description: Resource not found.
     *
     */
    router.get('/', scopeCreator(container, false), get);


    /**
     * @swagger
     *
     *   /weeklyLeaderBoard/userWeeklyLeaderboard:
     *      get:
     *         tags: ['weeklyLeaderBoard']
     *         order: 1
     *         security:
     *           - bearerAuth: []
     *         responses:
     *           200:
     *             description: Item is ready.
     *           400:
     *             description: Request failed.
     *           404:
     *             description: Resource not found.
     *
     */
    router.get('/userWeeklyLeaderboard', scopeCreator(container), getUserBoard);


    return router;
};
