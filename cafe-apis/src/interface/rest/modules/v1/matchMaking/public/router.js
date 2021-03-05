const {
    Router,
} = require('express');
const {
    scopeCreator,
} = require('src/interface/rest/middlewares');
const {
    normalMatch,
    getMatch,
    cancelMatch,
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
     *              matchId: 
     *                  string
     */

    const router = Router();

    /**
     * @swagger
     *
     *   /matchmaking/makeNormalMatch:
     *      post:
     *         tags: ['matchMaking']
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
     *                                gameMode: "normal"
     *                                maxPlayers : 10
     *         responses:
     *           200:
     *             description: Item is ready.
     *           400:
     *             description: Request failed.
     *           404:
     *             description: Resource not found.
     *
     */
    router.post('/makeNormalMatch', scopeCreator(container), normalMatch);


    /**
     * @swagger
     *
     *   /matchmaking/getMatchmakingData:
     *      post:
     *         tags: ['matchMaking']
     *         order: 1
     *         security:
     *           - bearerAuth: []
     *         requestBody:
     *             content:
     *                 application/json:
     *                     schema:
     *                        properties:  
     *                           matchId:
     *                              type: string                              
     *                     examples:
     *                         example1:
     *                             value:
     *                                 matchId: '#'
     *         responses:
     *           200:
     *             description: Item is ready.
     *           400:
     *             description: Request failed.
     *           404:
     *             description: Resource not found.
     *
     */
    router.post('/getMatchmakingData', scopeCreator(container), getMatch);

    /**
     * @swagger
     *
     *   /matchmaking/cancelMatchmaking:
     *      post:
     *         tags: ['matchMaking']
     *         order: 1
     *         security:
     *           - bearerAuth: []
     *         requestBody:
     *             content:
     *                 application/json:
     *                     schema:
     *                        properties:  
     *                           matchId:
     *                              type: string                              
     *                     examples:
     *                         example1:
     *                             value:
     *                                 matchId: '#'
     *         responses:
     *           200:
     *             description: Item is ready.
     *           400:
     *             description: Request failed.
     *           404:
     *             description: Resource not found.
     *
     */
    router.post('/cancelMatchmaking', scopeCreator(container), cancelMatch);

    return router;
};
