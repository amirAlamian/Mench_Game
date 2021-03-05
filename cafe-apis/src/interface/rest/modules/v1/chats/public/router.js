const {
    Router,
} = require('express');
const {
    scopeCreator,
} = require('src/interface/rest/middlewares');
const {
    startChat,
    get,
    sendChat,
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
     *   /chats/startChat:
     *      post:
     *         tags: ['chats']
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
     *                           chatId:
     *                              type: string                  
     *                     examples:
     *                         example1:
     *                             value:
     *                                username: "someRandomPerson"
     *         responses:
     *           200:
     *             description: Item is ready.
     *           400:
     *             description: Request failed.
     *           404:
     *             description: Resource not found.
     *
     */
    router.post('/startChat', scopeCreator(container), startChat);


    /**
     * @swagger
     *
     *   /chats/getChat:
     *      post:
     *         tags: ['chats']
     *         order: 1
     *         security:
     *           - bearerAuth: []
     *         requestBody:
     *             content:
     *                 application/json:
     *                     schema:
     *                        properties:
     *                           chatId:
     *                              type: string                     
     *                     examples:
     *                         example1:
     *                             value:
     *                                chatId: "#"
     *         responses:
     *           200:
     *             description: Item is ready.
     *           400:
     *             description: Request failed.
     *           404:
     *             description: Resource not found.
     *
     */
    router.post('/getChat', scopeCreator(container), get);


    /**
     * @swagger
     *
     *   /chats/sendChat:
     *      post:
     *         tags: ['chats']
     *         order: 1
     *         security:
     *           - bearerAuth: []
     *         requestBody:
     *             content:
     *                 application/json:
     *                     schema:
     *                        properties:
     *                           chatId:
     *                              type: string                     
     *                     examples:
     *                         example1:
     *                             value:
     *                                chatId: "#"
     *                                message: "hello how are you?"
     *         responses:
     *           200:
     *             description: Item is ready.
     *           400:
     *             description: Request failed.
     *           404:
     *             description: Resource not found.
     *
     */
    router.post('/sendChat', scopeCreator(container), sendChat);


    return router;
};
