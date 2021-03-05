const {
    Router,
} = require('express');
const {
    scopeCreator,
} = require('src/interface/rest/middlewares');
const {
    get,
    post,
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
     *              rewardId: 
     *                  string
     *           required:
     *              deviceId
     */

    const router = Router();

    /**
     * @swagger
     *
     *   /userRewards/getUserRewards:
     *      get:
     *         tags: ['userRewards']
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
    router.get('/getUserRewards', scopeCreator(container), get);

    /**
     * @swagger
     *
     *   /userRewards/useReward:
     *      post:
     *         tags: ['userRewards']
     *         order: 1
     *         security:
     *           - bearerAuth: []
     *         requestBody:
     *             content:
     *                 application/json:
     *                     schema:
     *                        properties:
     *                            rewardId:
     *                                type: string
     *                     examples:
     *                         example1:
     *                             value:
     *                                 rewardId: "example#####"
     *         responses:
     *           200:
     *             description: Item is ready.
     *           400:
     *             description: Request failed.
     *           404:
     *             description: Resource not found.
     *
     */
    router.post('/useReward', scopeCreator(container), post);
    return router;
};
