const {
    Router,
} = require('express');
const {
    scopeCreator,
} = require('src/interface/rest/middlewares');
const {
    addScore,
    addMatch,
    addCoin,
    addGem,
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
     *              score: 
     *                  integer
     */

    const router = Router();

    /**
     * @swagger
     *
     *   /currencies/addScore:
     *      post:
     *         tags: ['Currencies']
     *         order: 1
     *         security:
     *           - bearerAuth: []
     *         requestBody:
     *             content:
     *                 application/json:
     *                     schema:
     *                        properties:
     *                           score:
     *                              type: integer                  
     *                     examples:
     *                         example1:
     *                             value:
     *                                score: "10"
     *         responses:
     *           200:
     *             description: Item is ready.
     *           400:
     *             description: Request failed.
     *           404:
     *             description: Resource not found.
     *
     */
    router.post('/addScore', scopeCreator(container), addScore);


    /**
     * @swagger
     *
     *   /currencies/addMatch:
     *      post:
     *         tags: ['Currencies']
     *         order: 1
     *         security:
     *           - bearerAuth: []
     *         requestBody:
     *             content:
     *                 application/json:
     *                     schema:
     *                        properties:
     *                           status: 
     *                              type: string
     *                              enum: ['win','loose']               
     *                     examples:
     *                         example1:
     *                             value:
     *                                status: 'win'
     *         responses:
     *           200:
     *             description: Item is ready.
     *           400:
     *             description: Request failed.
     *           404:
     *             description: Resource not found.
     *
     */
    router.post('/addMatch', scopeCreator(container), addMatch);


    /**
     * @swagger
     *
     *   /currencies/addCoin:
     *      post:
     *         tags: ['Currencies']
     *         order: 1
     *         security:
     *           - bearerAuth: []
     *         requestBody:
     *             content:
     *                 application/json:
     *                     schema:
     *                        properties:
     *                           coin: 
     *                              type: number       
     *                     examples:
     *                         example1:
     *                             value:
     *                                coin: '100'
     *         responses:
     *           200:
     *             description: Item is ready.
     *           400:
     *             description: Request failed.
     *           404:
     *             description: Resource not found.
     *
     */
    router.post('/addCoin', scopeCreator(container), addCoin);

    /**
     * @swagger
     *
     *   /currencies/addGem:
     *      post:
     *         tags: ['Currencies']
     *         order: 1
     *         security:
     *           - bearerAuth: []
     *         requestBody:
     *             content:
     *                 application/json:
     *                     schema:
     *                        properties:
     *                           gem: 
     *                              type: number       
     *                     examples:
     *                         example1:
     *                             value:
     *                                gem: '100'
     *         responses:
     *           200:
     *             description: Item is ready.
     *           400:
     *             description: Request failed.
     *           404:
     *             description: Resource not found.
     *
     */
    router.post('/addGem', scopeCreator(container), addGem);

    return router;
};
