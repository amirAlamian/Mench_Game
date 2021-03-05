const {
    Router,
} = require('express');
const {
    scopeCreator,
} = require('src/interface/rest/middlewares');
const {
    add,
    usePowerUp,
    get,
} = require('./controller');

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
     *               itemType:
     *                   type: integer
     *               count: 
     *                   type: integer
     *               itemId: 
     *                   type: string
     *           required:
     *              itemType
     */

    const router = Router();

    /**
     * @swagger
     *
     *   /shop/addShopItem:
     *      post:
     *         tags: ['Shop']
     *         security:
     *           - bearerAuth: []
     *         description: add shop item
     *         order: 1
     *         requestBody:
     *             content:
     *                 application/json:
     *                     schema:
     *                        properties:
     *                            itemType:
     *                                type: integer
     *                            count: 
     *                                type: integer
     *                            itemId: 
     *                                type: string
     *                     examples:
     *                         example1:
     *                             value:
     *                                 itemType: "1"
     *                                 count: 10
     *                                 itemId: "2"
     *         responses:
     *           200:
     *             description: Item is ready.
     *           400:
     *             description: Request failed.
     *           404:
     *             description: Resource not found.
     *
     */
    router.post('/addShopItem', scopeCreator(container), add);


    /**
     * @swagger
     *
     *   /shop/usePowerup:
     *      post:
     *         tags: ['Shop']
     *         security:
     *           - bearerAuth: []
     *         description: use power up item
     *         order: 1
     *         requestBody:
     *             content:
     *                 application/json:
     *                     schema:
     *                        properties:
     *                            itemId: 
     *                                type: string
     *                     examples:
     *                         example1:
     *                             value:
     *                                 itemId: "2"
     *         responses:
     *           200:
     *             description: Item is ready.
     *           400:
     *             description: Request failed.
     *           404:
     *             description: Resource not found.
     *
     */
    router.post('/usePowerup', scopeCreator(container), usePowerUp);


    /**
     * @swagger
     *
     *   /shop/getShopItems:
     *      get:
     *         tags: ['Shop']
     *         security:
     *           - bearerAuth: []
     *         description: use power up item
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
    router.get('/getShopItems', scopeCreator(container), get);

    return router;
};
