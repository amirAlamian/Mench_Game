const {
    Router,
} = require('express');
const {
    scopeCreator,
} = require('src/interface/rest/middlewares');
const {
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
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
     *   /friendship/sendFriendRequest:
     *      post:
     *         tags: ['friendship']
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
     *                     examples:
     *                         example1:
     *                             value:
     *                                username: "#"
     *         responses:
     *           200:
     *             description: Item is ready.
     *           400:
     *             description: Request failed.
     *           404:
     *             description: Resource not found.
     *
     */
    router.post('/sendFriendRequest', scopeCreator(container), sendFriendRequest);


    /**
     * @swagger
     *
     *   /friendship/acceptFriendRequest:
     *      post:
     *         tags: ['friendship']
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
     *                     examples:
     *                         example1:
     *                             value:
     *                                username: "#"
     *         responses:
     *           200:
     *             description: Item is ready.
     *           400:
     *             description: Request failed.
     *           404:
     *             description: Resource not found.
     *
     */
    router.post('/acceptFriendRequest', scopeCreator(container), acceptFriendRequest);


    /**
     * @swagger
     *
     *   /friendship/rejectFriendRequest:
     *      post:
     *         tags: ['friendship']
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
     *                     examples:
     *                         example1:
     *                             value:
     *                                username: "#"
     *         responses:
     *           200:
     *             description: Item is ready.
     *           400:
     *             description: Request failed.
     *           404:
     *             description: Resource not found.
     *
     */
    router.post('/rejectFriendRequest', scopeCreator(container), rejectFriendRequest);


    return router;
};
