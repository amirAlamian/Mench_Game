const {
    Router,
} = require('express');
const {
    scopeCreator,
} = require('src/interface/rest/middlewares');
const {
    top10,
    userLeaderBoard,
    friendsLeaderBoard,
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
     *   /leaderboard/top10:
     *      get:
     *         tags: ['leaderBoard']
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
    router.get('/top10', scopeCreator(container, false), top10);


    /**
     * @swagger
     *
     *   /leaderboard/userLeaderboard:
     *      get:
     *         tags: ['leaderBoard']
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
    router.get('/userLeaderboard', scopeCreator(container), userLeaderBoard);


    /**
     * @swagger
     *
     *   /leaderboard/friendsLeaderboard:
     *      get:
     *         tags: ['leaderBoard']
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
    router.get('/friendsLeaderboard', scopeCreator(container), friendsLeaderBoard);


    return router;
};
