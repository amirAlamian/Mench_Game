const {
    Router,
} = require('express');
const {
    scopeCreator,
} = require('src/interface/rest/middlewares');
const {
    getGameData,
    setNewAction,
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
     *   /gameplay/getGameData:
     *      post:
     *         tags: ['gameplay']
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
     *                                matchId: "#"
     *         responses:
     *           200:
     *             description: Item is ready.
     *           400:
     *             description: Request failed.
     *           404:
     *             description: Resource not found.
     *
     */
    router.post('/getGameData', scopeCreator(container), getGameData);


    /**
     * @swagger
     *
     *   /gameplay/setNewAction:
     *      post:
     *         tags: ['gameplay']
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
     *                                matchId: "#"
     *                                newAction: "****"
     *         responses:
     *           200:
     *             description: Item is ready.
     *           400:
     *             description: Request failed.
     *           404:
     *             description: Resource not found.
     *
     */
    router.post('/setNewAction', scopeCreator(container), setNewAction);


    return router;
};
