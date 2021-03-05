const {
    Router,
} = require('express');
const {
    scopeCreator,
} = require('src/interface/rest/middlewares');
const {
    post,
    get,
    getTarget,
    acceptMatch,
    rejectMatch,
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
     *   /matchRequests/sendMatchRequest:
     *      post:
     *         tags: ['matchRequest']
     *         order: 1
     *         security:
     *           - bearerAuth: []
     *         requestBody:
     *             content:
     *                 application/json:
     *                     schema:
     *                        properties:
     *                           username:
     *                              type: string
     *                           gameMode: 
     *                              type: string                          
     *                     examples:
     *                         example1:
     *                             value:
     *                                username: "someRandomPerson"
     *                                gameMode: "basic"
     *         responses:
     *           200:
     *             description: Item is ready.
     *           400:
     *             description: Request failed.
     *           404:
     *             description: Resource not found.
     *
     */
    router.post('/sendMatchRequest', scopeCreator(container), post);

    /**
     * @swagger
     *
     *   /matchRequests/getAllMatchRequest:
     *      get:
     *         tags: ['matchRequest']
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
    router.get('/getAllMatchRequest', scopeCreator(container), get);

    /**
     * @swagger
     *
     *   /matchRequests/getTargetMatchRequest:
     *      post:
     *         tags: ['matchRequest']
     *         order: 1
     *         security:
     *           - bearerAuth: []
     *         requestBody:
     *             content:
     *                 application/json:
     *                     schema:
     *                        properties:
     *                          matchId:
     *                              type: string                          
     *                     examples:
     *                         example1:
     *                             value:
     *                               matchId: "#"   
     *         responses:
     *           200:
     *             description: Item is ready.
     *           400:
     *             description: Request failed.
     *           404:
     *             description: Resource not found.
     *
     */
    router.post('/getTargetMatchRequest', scopeCreator(container), getTarget);

    /**
     * @swagger
     *
     *   /matchRequests/acceptMatchRequest:
     *      post:
     *         tags: ['matchRequest']
     *         order: 1
     *         security:
     *           - bearerAuth: []
     *         requestBody:
     *             content:
     *                 application/json:
     *                     schema:
     *                        properties:
     *                          matchId:
     *                              type: string                          
     *                     examples:
     *                         example1:
     *                             value:
     *                               matchId: "#"   
     *         responses:
     *           200:
     *             description: Item is ready.
     *           400:
     *             description: Request failed.
     *           404:
     *             description: Resource not found.
     *
     */
    router.post('/acceptMatchRequest', scopeCreator(container), acceptMatch);

    /**
     * @swagger
     *
     *   /matchRequests/rejectMatchRequest:
     *      post:
     *         tags: ['matchRequest']
     *         order: 1
     *         security:
     *           - bearerAuth: []
     *         requestBody:
     *             content:
     *                 application/json:
     *                     schema:
     *                        properties:
     *                          matchId:
     *                              type: string                          
     *                     examples:
     *                         example1:
     *                             value:
     *                               matchId: "#"   
     *         responses:
     *           200:
     *             description: Item is ready.
     *           400:
     *             description: Request failed.
     *           404:
     *             description: Resource not found.
     *
     */
    router.post('/rejectMatchRequest', scopeCreator(container), rejectMatch);
    return router;
};
